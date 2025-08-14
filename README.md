## 🐉 혼테일 타이머 (Horntail Timer)

메이플랜드의 보스 혼테일 공략을 보조하는 직관적인 타이머 웹 애플리케이션입니다.
Next.js(App Router)와 Tailwind CSS로 제작되었습니다.

### ✨ 기능 요약
- **머리 타이머 3개 (좌/중/우)**: 각 43초, 단발성. 키보드 단축키: `1`, `2`, `3`.
- **버프해제 타이머 2개 (50% / 30%)**: 각각 **5분 1초**, **3분 1초**. 완료 시 자동 반복. 단축키: `5`, `6`.
- **클릭 또는 단축키로 시작/정지**: 진행 중에 다시 누르면 정지됩니다.
- **임박 경고(깜빡임)**: 머리 타이머는 남은 **3초**, 버프해제는 남은 **10초**부터 텍스트/배경이 부드럽게 깜빡이며 강조됩니다.
- **타이머별 경고 배경색**: 각 카드마다 다른 경고색(로즈/앰버/에메랄드/스카이/퓨시아)으로 구분.
- **반응형 UI**: 데스크톱/모바일에서 모두 사용하기 편한 레이아웃. iPad 등 터치 환경에서 눌리기 쉽게 카드/텍스트 크기 확대.

### 🖥 화면 구성
- 상단: 좌, 중, 우 머리 타이머(43초)
- 하단: 버프해제 50%(5분1초, 반복), 30%(3분1초, 반복)

### ⌨️ 단축키
- 좌: `1`, 중: `2`, 우: `3`
- 버프해제 50%: `5`, 버프해제 30%: `6`

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
  - 클릭 또는 단축키로 시작/정지, 단발성은 0초에서 멈추고 반복형은 다시 시작

### 경고/시각 효과 설정
- 경고 임계값: `warningSeconds` prop으로 설정
  - 머리 타이머: 5초, 버프해제 타이머: 10초
- 경고 배경색: `warningBgClassName` prop으로 Tailwind 색상 지정 (예: `bg-rose-500`)
- 애니메이션 타이밍: `src/app/globals.css`의 `.warning-blink`, `.warning-blink-bg` 에서 조절
  - 현재 기본값: 텍스트 0.2s, 배경 0.3s, `ease-in-out`, `alternate`
  - 시스템 ‘감소된 모션’ 설정 시 자동으로 애니메이션 비활성화

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

## 📄 라이선스
이 프로젝트는 **MIT License**로 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참고하세요.
