import { renderHook, act } from '@testing-library/react';
import { EventProvider } from '../EventProvider';
import { useEventSubscription, useEventPublisher, useEventHistory } from '../hooks';
import type { AppEvent } from '../types';

describe('Event Hooks', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <EventProvider>{children}</EventProvider>
  );

  describe('useEventSubscription', () => {
    it('should subscribe to events', () => {
      const handler = jest.fn();
      const { result: publisherResult } = renderHook(() => useEventPublisher(), { wrapper });
      
      renderHook(() => useEventSubscription('TEST_EVENT', handler), { wrapper });

      const event: AppEvent = {
        type: 'TEST_EVENT',
        timestamp: Date.now(),
        source: 'test',
        payload: { data: 'test' },
      };

      act(() => {
        publisherResult.current.publish(event);
      });

      expect(handler).toHaveBeenCalledWith(event);
    });

    it('should unsubscribe on unmount', () => {
      const handler = jest.fn();
      const { result: publisherResult } = renderHook(() => useEventPublisher(), { wrapper });
      
      const { unmount } = renderHook(() => useEventSubscription('TEST_EVENT', handler), { wrapper });

      unmount();

      const event: AppEvent = {
        type: 'TEST_EVENT',
        timestamp: Date.now(),
        source: 'test',
        payload: { data: 'test' },
      };

      act(() => {
        publisherResult.current.publish(event);
      });

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe('useEventPublisher', () => {
    it('should publish events', () => {
      const handler = jest.fn();
      const { result } = renderHook(() => useEventPublisher(), { wrapper });
      
      renderHook(() => useEventSubscription('TEST_EVENT', handler), { wrapper });

      const event: AppEvent = {
        type: 'TEST_EVENT',
        timestamp: Date.now(),
        source: 'test',
        payload: { data: 'test' },
      };

      act(() => {
        result.current.publish(event);
      });

      expect(handler).toHaveBeenCalledWith(event);
    });
  });

  describe('useEventHistory', () => {
    it('should return event history', () => {
      const { result: publisherResult } = renderHook(() => useEventPublisher(), { wrapper });
      const { result: historyResult } = renderHook(() => useEventHistory(), { wrapper });

      const event: AppEvent = {
        type: 'TEST_EVENT',
        timestamp: Date.now(),
        source: 'test',
        payload: { data: 'test' },
      };

      act(() => {
        publisherResult.current.publish(event);
      });

      expect(historyResult.current).toContainEqual(event);
    });
  });
});
