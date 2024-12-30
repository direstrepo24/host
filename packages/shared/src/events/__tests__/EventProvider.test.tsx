import { render, screen } from '@testing-library/react';
import { EventProvider } from '../EventProvider';
import { useEventContext } from '../hooks';

describe('EventProvider', () => {
  const TestComponent = () => {
    const context = useEventContext();
    return (
      <div>
        {context ? 'Context Available' : 'No Context'}
      </div>
    );
  };

  it('should provide event context to children', () => {
    render(
      <EventProvider>
        <TestComponent />
      </EventProvider>
    );

    expect(screen.getByText('Context Available')).toBeInTheDocument();
  });

  it('should handle nested providers', () => {
    render(
      <EventProvider>
        <EventProvider>
          <TestComponent />
        </EventProvider>
      </EventProvider>
    );

    expect(screen.getByText('Context Available')).toBeInTheDocument();
  });
});
