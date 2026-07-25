# trip-guide — 프로젝트 CLAUDE.md

본 프로젝트는 상위 CLAUDE.md(`C:\Users\heleownae\my-claude\CLAUDE.md`)의 규칙을 상속합니다. 4단계 개발 파이프라인, 폴더 구조 원칙, 디자인 제약(정형화된 AI 스타일 금지 등) 등 공통 규칙은 상위 문서를 따르며, 아래는 이 프로젝트 고유 정보만 정리합니다.

## 프로젝트 개요

교토 3박4일(11/14~11/17, 4인) 여행 가이드를 친구들과 공유하기 위한 정적 웹 페이지.

- **스택**: 순수 HTML/CSS/JS. 빌드 도구, 프레임워크 없음.
- **배포**: GitHub 공개 저장소 `trip-guide` → Vercel 연동, 정적 사이트로 배포.
- **로컬 실행**: `시작 5500.bat` 실행 → `npx serve -l 5500 .` (http://localhost:5500)
- **개발 슬라이스 목록**: `docs/TODO.md` 참고 (Slice 1~6, 수직적 슬라이스 방식)

## 디자인 토큰 요약 (`styles.css` `:root` 참고)

- 캔버스 `#ebf5ff` / 카드 `#fafdff` / 텍스트 `#0a0d12`(주) `#535862`(보조) `#93979f`(옅음)
- 버튼/진한 배경 `#181d27`, 액센트 `#0069e0`
- Day 탭 파스텔 wash 4색: 라벤더 `#efe9fb`, 민트 `#e2f6ee`, 파우더블루 `#e3f0fb`, 피치 `#fdece1` (각 진한 액센트 포함, 시각 검증 전 임시값)
- 라운드: 카드 32px, 필/버튼 9999px
- 폰트: Pretendard 단일 사용 (jsDelivr CDN 로드), weight 400~800 대비로 타이포그래피 구성
- 반응형: 모바일퍼스트, 375px 기준 → 768px / 1024px min-width 확장

## 이미지 정책

로컬에 이미지 파일을 다운로드하지 않는다. 구글맵 embed(iframe, API 키 불필요)와 Unsplash 무료 이미지 직접 URL 핫링크만 사용.
