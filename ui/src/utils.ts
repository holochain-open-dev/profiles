export interface SafeIntervalOptions {
  /** Human-readable name for logging purposes */
  name: string;
  /** The async function to call periodically */
  fn: () => Promise<void>;
  /** Interval in milliseconds between the END of one call and the START of the next */
  intervalMs: number;
  /** Optional: run immediately on start (default: false) */
  runImmediately?: boolean;
}

export interface SafeIntervalHandle {
  /** Cancel the interval - any in-progress call will complete but no more will be scheduled */
  cancel: () => void;
}

/**
 * Creates a safe interval that prevents stacking of async calls.
 *
 * Unlike setInterval, this uses a self-rescheduling pattern:
 * - Waits for the current call to complete before scheduling the next
 * - The interval is measured from the END of one call to the START of the next
 * - This prevents call buildup when operations are slow
 *
 * Logs a warning if the operation takes longer than the interval.
 */
export function safeSetInterval(options: SafeIntervalOptions): SafeIntervalHandle {
  const { name, fn, intervalMs, runImmediately = false } = options;

  let isCancelled = false;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const executeAndSchedule = async () => {
    if (isCancelled) return;

    const startTime = Date.now();

    try {
      await fn();
    } catch (error) {
      console.error(`[SafeInterval] "${name}" error:`, error);
    } finally {
      const duration = Date.now() - startTime;

      if (duration > intervalMs) {
        console.warn(
          `[SafeInterval] "${name}" took ${duration / 1000}s, which is ${(duration - intervalMs) / 1000}s longer than the ${intervalMs / 1000}s interval`,
        );
      }

      // Schedule next execution after the interval
      if (!isCancelled) {
        timeoutId = setTimeout(executeAndSchedule, intervalMs);
      }
    }
  };

  // Start the interval
  if (runImmediately) {
    // Use setTimeout with 0 to ensure we're not blocking the current execution
    timeoutId = setTimeout(executeAndSchedule, 0);
  } else {
    timeoutId = setTimeout(executeAndSchedule, intervalMs);
  }

  return {
    cancel: () => {
      isCancelled = true;
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
  };
}
