// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom', // jsdom 환경을 설정하여 브라우저 관련 API 지원
        globals: true, // global 변수 설정 (예: expect, test, vi 등)
        include: ['**/*.test.tsx', '**/*.test.ts'], // 테스트 파일 경로를 명확히 지정
        exclude: ['**/supabase.js', '**/vitest.config.ts'], // 무시할 파일 추가
    },
});
