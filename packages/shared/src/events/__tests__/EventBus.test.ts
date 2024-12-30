import { EventBus } from '../EventBus';
import type { AppEvent } from '../types';

describe('EventBus', () => {
  let eventBus: EventBus;

  beforeEach(() => {
    // Reset singleton instance
    (EventBus as any).instance = null;
    eventBus = EventBus.getInstance() as EventBus;
  });

  it('should create a singleton instance', () => {
    const instance1 = EventBus.getInstance();
    const instance2 = EventBus.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should allow subscription and publishing of events', () => {
    const handler = jest.fn();
    const event: AppEvent = {
      type: 'TEST_EVENT',
      timestamp: Date.now(),
      source: 'test',
      payload: { data: 'test' },
    };

    eventBus.subscribe('TEST_EVENT', handler);
    eventBus.publish(event);

    expect(handler).toHaveBeenCalledWith(event);
  });

  it('should maintain event history', () => {
    const event: AppEvent = {
      type: 'TEST_EVENT',
      timestamp: Date.now(),
      source: 'test',
      payload: { data: 'test' },
    };

    eventBus.publish(event);
    const history = eventBus.getHistory();

    expect(history).toContainEqual(event);
  });

  it('should allow unsubscription from events', () => {
    const handler = jest.fn();
    const event: AppEvent = {
      type: 'TEST_EVENT',
      timestamp: Date.now(),
      source: 'test',
      payload: { data: 'test' },
    };

    const unsubscribe = eventBus.subscribe('TEST_EVENT', handler);
    unsubscribe();
    eventBus.publish(event);

    expect(handler).not.toHaveBeenCalled();
  });

  it('should handle multiple subscribers for the same event type', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const event: AppEvent = {
      type: 'TEST_EVENT',
      timestamp: Date.now(),
      source: 'test',
      payload: { data: 'test' },
    };

    eventBus.subscribe('TEST_EVENT', handler1);
    eventBus.subscribe('TEST_EVENT', handler2);
    eventBus.publish(event);

    expect(handler1).toHaveBeenCalledWith(event);
    expect(handler2).toHaveBeenCalledWith(event);
  });

  it('should only notify subscribers of the correct event type', () => {
    const handler1 = jest.fn();
    const handler2 = jest.fn();
    const event: AppEvent = {
      type: 'TEST_EVENT_1',
      timestamp: Date.now(),
      source: 'test',
      payload: { data: 'test' },
    };

    eventBus.subscribe('TEST_EVENT_1', handler1);
    eventBus.subscribe('TEST_EVENT_2', handler2);
    eventBus.publish(event);

    expect(handler1).toHaveBeenCalledWith(event);
    expect(handler2).not.toHaveBeenCalled();
  });

  it('should limit event history size', () => {
    const maxEvents = 100;
    for (let i = 0; i < maxEvents + 10; i++) {
      eventBus.publish({
        type: 'TEST_EVENT',
        timestamp: Date.now(),
        source: 'test',
        payload: { index: i },
      });
    }

    const history = eventBus.getHistory();
    expect(history.length).toBeLessThanOrEqual(maxEvents);
  });
});
