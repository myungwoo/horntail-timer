## 🐉 혼테일 타이머 (Horntail Timer)

메이플랜드의 보스 혼테일 공략을 보조하는 직관적인 타이머 웹 애플리케이션입니다.
Next.js(App Router)와 Tailwind CSS로 제작되었습니다.

### ✨ 기능 요약
- **머리 타이머 3개 (좌/중/우)**: 각 43초, 단발성. 키보드 단축키: `1`, `2`, `3`.
- **버프해제 타이머 2개 (50% / 30%)**: 각각 **5분 1초**, **3분 1초**. 완료 시 자동 반복. 단축키: `5`, `6`.
- **클릭 또는 단축키로 시작/정지**: 진행 중에 다시 누르면 정지됩니다.
- **간결한 진행률 표시**: 상단 그래디언트 바로 남은 시간 비율을 시각화합니다.
- **반응형 UI**: 데스크톱/모바일에서 모두 사용하기 편한 레이아웃.

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
