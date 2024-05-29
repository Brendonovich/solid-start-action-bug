import { action, useAction, useSubmission } from '@solidjs/router';
import { createEffect, ErrorBoundary, onMount } from 'solid-js';

const testAction = action(async (id: number) => {
  throw Error('ERROR DUDE');
  return `foo ${id}`;
});

// actual page
export default function Home() {
  const test = useAction(testAction);
  const testTracking = useSubmission(testAction);

  onMount(async () => {
    try {
      const result = await test(123);
      console.debug('DEBUG: onMount action result', result);
    } catch (e: unknown) {
      console.debug('DEBUG: onMount action call', e.message);
    }
  });

  createEffect(() => {
    console.debug(
      'DEBUG testAction: ',
      testTracking.pending,
      testTracking.result,
      testTracking.error?.message
    );
  });

  return (
    <ErrorBoundary fallback={<div>Inside Error Boundary</div>}>
      <div>
        Hello {testTracking.result}
        {/* {resourcebar()} */}
      </div>
    </ErrorBoundary>
  );
}
