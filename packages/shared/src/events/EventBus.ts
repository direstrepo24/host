import { AppEvent, EventHandler, EventSubscribersMap } from "./types";

/**
 * EventBus implementa un sistema de eventos pub/sub para la comunicación entre módulos.
 * Utiliza el patrón Singleton para asegurar una única instancia en toda la aplicación.
 */
export class EventBus {
  private static instance: EventBus;
  private subscribers: EventSubscribersMap;
  private eventHistory: AppEvent[];
  private readonly maxHistorySize: number;

  private constructor() {
    this.subscribers = new Map();
    this.eventHistory = [];
    this.maxHistorySize = 100; // Limitamos el historial para evitar fugas de memoria
  }

  /**
   * Obtiene la instancia única del EventBus.
   * Si no existe, crea una nueva instancia.
   */
  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  /**
   * Suscribe un manejador a un tipo específico de evento.
   * @param eventType - El tipo de evento a escuchar
   * @param handler - La función que maneja el evento
   * @returns Una función para cancelar la suscripción
   */
  public subscribe<T extends AppEvent>(
    eventType: T['type'],
    handler: EventHandler<T>
  ): () => void {
    if (!this.subscribers.has(eventType)) {
      this.subscribers.set(eventType, new Set());
    }

    const handlers = this.subscribers.get(eventType)!;
    handlers.add(handler as EventHandler<AppEvent>);

    // Retornamos una función para desuscribirse
    return () => {
      handlers.delete(handler as EventHandler<AppEvent>);
      if (handlers.size === 0) {
        this.subscribers.delete(eventType);
      }
    };
  }

  /**
   * Publica un evento a todos los manejadores suscritos.
   * @param event - El evento a publicar
   */
  public async publish<T extends AppEvent>(event: T): Promise<void> {
    console.log('EventBus: Publishing event:', event);
    // Agregamos metadata al evento
    const enrichedEvent = {
      ...event,
      timestamp: Date.now(),
    };

    // Guardamos en el historial
    this.addToHistory(enrichedEvent);

    // Notificamos a los suscriptores
    const handlers = this.subscribers.get(event.type);
    console.log('EventBus: Found handlers:', handlers ? handlers.size : 0);
    
    if (handlers) {
      await Promise.all(
        Array.from(handlers).map((handler) => {
          console.log('EventBus: Calling handler for event:', event.type);
          return Promise.resolve(handler(enrichedEvent));
        })
      );
    }
  }

  /**
   * Obtiene el historial de eventos.
   * @returns Array de eventos publicados
   */
  public getHistory(): AppEvent[] {
    return [...this.eventHistory];
  }

  private addToHistory(event: AppEvent): void {
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }
  }
}
