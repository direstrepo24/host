import { z } from 'zod';

export const ModuleConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  routes: z.array(z.object({
    path: z.string(),
    component: z.function(),
    index: z.boolean().optional(),
  })),
  permissions: z.array(z.string()).optional(),
});

export const ModuleEventSchema = z.object({
  type: z.string(),
  payload: z.record(z.unknown()),
  source: z.string(),
  timestamp: z.number(),
});

export type ModuleConfig = z.infer<typeof ModuleConfigSchema>;
export type ModuleEvent = z.infer<typeof ModuleEventSchema>;

export function validateModuleConfig(config: unknown): ModuleConfig {
  return ModuleConfigSchema.parse(config);
}

export function validateModuleEvent(event: unknown): ModuleEvent {
  return ModuleEventSchema.parse(event);
}
