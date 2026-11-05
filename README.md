# Rescue Geolocation

## 개발 환경

Bun 1.4.4와 Node.js 24.11 이상을 사용합니다. 저장소 루트에서 실행하세요.

```sh
bun install --frozen-lockfile
bun run dev
bun run build
bun run typecheck
bun run lint
```

`bun.lock`을 버전 관리하며, 의존성을 변경한 뒤 `bun install`로 갱신합니다.
Vercel 프로젝트의 Root Directory는 `apps/web`입니다. 설치·빌드 명령은
`apps/web/vercel.json`에 정의되어 있습니다. Preview/Production 환경에
`DATABASE_URL`과 `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`를 설정해야 합니다.

MongoDB Atlas 호환성을 위해 `prisma`와 `@prisma/client`는 6.19.3으로 함께
고정했습니다. Prisma 7은 MongoDB를 지원하지 않고, Prisma 8은 RC이므로
안정판 MongoDB 지원을 확인한 뒤 별도로 이전해야 합니다.
TypeScript는 ESLint 및 타입 선언 빌드 호환성을 위해 6.0.3을 사용합니다.

## 조난자 위치 공유

1. 앱열기 <https://rescue.clev.app>

![init](./assets/rescue.clev.app_(iPhone%20SE).png)

2. 링크 생성

![create](./assets/rescue.clev.app_(iPhone%20SE)%20(1).png)

3. 링크 복사

![copy](./assets/rescue.clev.app_(iPhone%20SE)%20(2).png)

4. 조난자 화면: 조난자가 받은 링크를 클릭하여 열었을 때 (위치정보는 이동시에 지속적으로 전송함)

![sharing](./assets/rescue.clev.app_rescue_X-HVbC(iPhone%20SE).png)

5. 구조대원 화면: 구조대원은 최근 위치를 맨위로 위치정보를 확인

![tracking](./assets/rescue.clev.app_tracking_X-HVbC(iPhone%20SE).png)
