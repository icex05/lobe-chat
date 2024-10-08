// TODO: 未来所有路由需要全部迁移到 trpc

/* eslint-disable sort-keys-fix/sort-keys-fix */
import { transform } from 'lodash-es';

import { withBasePath } from '@/utils/basePath';

const mapWithBasePath = <T extends object>(apis: T): T => {
  return transform(apis, (result, value, key) => {
    if (typeof value === 'string') {
      // @ts-ignore
      result[key] = withBasePath(value);
    } else {
      result[key] = value;
    }
  });
};

export const API_ENDPOINTS = mapWithBasePath({
  proxy: '/api/proxy',
  oauth: '/api/auth',

  // agent markets
  assistantStore: '/api/assistant/store',
  assistant: (identifier: string) => withBasePath(`/api/assistant/${identifier}`),

  // plugins
  gateway: '/api/plugin/gateway',
  pluginStore: '/api/plugin/store',

  // chat
  chat: (provider: string) => withBasePath(`/api/chat/${provider}`),
  chatModels: (provider: string) => withBasePath(`/api/chat/models/${provider}`),

  // trace
  trace: '/api/trace',

  // image
  images: '/api/text-to-image/openai',

  // TTS & STT
  stt: '/api/openai/stt',
  tts: '/api/openai/tts',
  edge: '/api/tts/edge-speech',
  microsoft: '/api/tts/microsoft-speech',
});
