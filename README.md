## 🐉 혼테일 타이머 (Horntail Timer)

바로 사용해보기: [myungwoo.github.io/horntail-timer](https://myungwoo.github.io/horntail-timer/)

메이플랜드의 보스 혼테일 공략을 보조하는 직관적인 타이머 웹 애플리케이션입니다.
Next.js(App Router)와 Tailwind CSS로 제작되었습니다.

### ✨ 기능 요약
- **머리 타이머 3개 (좌/중/우)**: 각 43초, 단발성. 키보드 단축키: `1`, `2`, `3`.
- **버프해제 타이머 2개 (50% / 30%)**: 각각 **5분 1초**, **3분 1초**. 완료 시 자동 반복. 단축키: `5`, `6`.
- **입력 시 재시작**: 카드 클릭/단축키 입력 시 타이머를 정지하지 않고 원래 시간으로 즉시 재시작.
- **정지 UX 제공**: `Shift+단축키` 또는 카드 "길게 누르기(약 0.6초)"로 명시적 정지.
- **임박 경고(깜빡임 + 경고음)**: 머리 타이머 남은 **3초**, 버프해제 남은 **10초**부터 텍스트/배경이 부드럽게 깜빡이며, 구간 동안 빠른 경고음이 반복 재생.
- **타이머별 경고 배경색/경고음 패턴**: 카드별 색상과 서로 다른 톤 패턴으로 직관적 구분.
- **정확한 타이밍**: 실제 시계 기반 계산(드리프트 방지), UI는 100ms 간격으로 부드럽게 갱신.
- **반응형 UI**: 데스크톱/모바일에서 모두 사용하기 편한 레이아웃. iPad 등 터치 환경에서 눌리기 쉽게 카드/텍스트 크기 확대.
- **PWA 지원(아이콘/홈 화면 추가)**: 웹앱 매니페스트 제공.
- **탭 UI**: 3개의 탭으로 분리(기본/리저렉션/손님 마을)하여 한 화면 가독성 개선.

### 🖥 화면 구성
- 기본 탭: 좌/중/우 머리(각 43초), 버프해제 50%(5분1초, 반복), 30%(3분1초, 반복)
- 리저렉션 탭: 1~5번 리저(각 29분58초, 단발성) — 1행 3개, 2행 2개
- 손님 마을 탭: 손님 마을(14분, 단발성)

### ⌨️ 단축키
- 좌: `1`, 중: `2`, 우: `3`
- 버프해제 50%: `Q`, 버프해제 30%: `W`
- 리저렉션: `Z`(1번), `X`(2번), `C`(3번), `V`(4번), `B`(5번)
- 손님 마을: `Space`

---

## 🛠 개발 환경
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Dev Server**: Turbopack

### 로컬 실행
```bash
npm install
npm run dev
# http://localhost:3000 접속
```

### 빌드 및 미리보기
```bash
npm run build
npm run start
```

### 코드 구조
- 페이지: `src/app/page.tsx`
- 전역 레이아웃/메타: `src/app/layout.tsx`
- 전역 스타일: `src/app/globals.css`
- 타이머 컴포넌트: `src/components/TimerCard.tsx`

### 주요 컴포넌트 동작
- `TimerCard`
  - `durationSeconds`: 타이머 길이(초)
  - `autoRepeat`: true이면 완료 후 자동 반복
  - `hotkey`: 단축키(예: `"1"`, `"5"`)
  - 클릭/단축키: 타이머 재시작
  - 정지: `Shift+단축키` 또는 카드 길게 누르기(약 0.6초)
  - 정확도: `performance.now` 기반 경과시간 계산(드리프트 방지), 100ms 주기 화면 갱신

### 경고/시각 효과 설정
- 경고 임계값: `warningSeconds` prop으로 설정
  - 머리 타이머: 3초, 버프해제 타이머: 10초
- 경고 배경색: `warningBgClassName` prop으로 Tailwind 색상 지정 (예: `bg-rose-500`)
- 애니메이션 타이밍: `src/app/globals.css`의 `.warning-blink`, `.warning-blink-bg` 에서 조절
  - 현재 기본값: 텍스트 0.2s, 배경 0.3s, `ease-in-out`, `alternate`
  - 시스템 ‘감소된 모션’ 설정 시 자동으로 애니메이션 비활성화

### 경고음(오디오) 설정
- 사운드 프로필: `soundProfile` prop으로 지정 (`left`, `middle`, `right`, `dispel50`, `dispel30`)
  - 좌/중/우: 서로 다른 단음(피치로 구분)
  - 50%/30%: 2음 패턴(상승/하강)으로 구분
- 재생 동작: 경고 임계 진입 시 즉시 1회 재생 후, 경고 지속 동안 약 350ms 간격으로 반복 재생
- 볼륨/패턴 변경: `src/lib/audio.ts`의 `getPatternForProfile`과 `playPattern`에서 조정
- 자동재생 정책: 첫 사용자 제스처(클릭/키 입력) 이후에 동작하는 것이 가장 안정적입니다.

### 타이머 주기 변경
- 타이머별 지속시간은 `src/app/page.tsx`에서 각 `TimerCard`의 `durationSeconds`로 제어합니다.
- 필요 시 일부 타이머 주기값을 변경해 사용할 수 있습니다.

---

## 🚀 배포 (GitHub Pages)
이 프로젝트는 GitHub Actions로 정적 내보내기(`next export`)된 결과물을 GitHub Pages에 배포하도록 구성되어 있습니다.

### 설정
1. 저장소 이름이 `horntail-timer`가 아닌 경우, `next.config.ts`의 `basePath`를 저장소명으로 맞춰주세요.
2. 저장소의 Settings → Pages에서 **Source: GitHub Actions**를 선택합니다.

### 워크플로우
`main` 브랜치에 푸시하면 자동으로 빌드/배포가 진행됩니다. 워크플로우 파일: `.github/workflows/deploy.yml`

### 로컬 확인 후 배포
```bash
npm run build
# out/ 디렉터리에 정적 파일 생성
```

---

## 📱 PWA / 아이콘

### 아이콘 소스와 생성
- 기본 소스: `src/app/icon.svg`
- 생성 스크립트: `npm run icons`
  - 생성 결과:
    - 파비콘: `src/app/favicon.ico`
    - 애플 터치 아이콘: `public/apple-touch-icon.png` (180x180)
    - PNG 아이콘: `public/icon-16.png`, `icon-32.png`, `icon-48.png`, `icon-64.png`, `icon-128.png`, `icon-180.png`, `icon-192.png`, `icon-256.png`, `icon-512.png`

### 웹앱 매니페스트
- 파일: `src/app/manifest.ts` → `/manifest.webmanifest`로 제공
- 아이콘 참조: 192x192, 512x512, 180x180(apple)
- 표시 모드: `standalone`, 색상: 다크 톤

### HTML head 반영 여부(추가 코드 필요?)
- 이미 `src/app/layout.tsx`의 메타데이터에 `icons`와 `manifest`가 설정되어 있어, **별도의 추가 코드 수정 없이** 파비콘/아이콘/매니페스트가 적용됩니다.
- `src/app/icon.svg`는 Next.js App Router에서 자동으로 아이콘으로도 인식됩니다.

---

## 📄 라이선스
이 프로젝트는 **MIT License**로 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참고하세요.
