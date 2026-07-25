// trip-guide — 교토 3박4일 여행 가이드
// Slice 3: Day 탭 네비게이션 전환 로직.
// 순수 함수(resolveActiveDay, isDayActive)는 DOM에 접근하지 않으며
// tests/tab-logic.test.mjs 에서 node:test 로 직접 검증한다.
// 브라우저 로드 시 index.html 에서 <script type="module" src="script.js">
// 로 불러오므로 여기서 export 한 함수는 그대로 노드 테스트에서도 import 가능하다.

/**
 * 클릭(또는 초기화)된 targetId를 바탕으로 실제로 활성화되어야 할 dayId를 결정한다.
 * - targetId가 days 목록에 있으면 그대로 사용한다.
 * - targetId가 없거나(null/undefined) 목록에 없는 유효하지 않은 값이면
 *   목록의 첫 번째 day로 폴백한다.
 * - days 자체가 빈 배열이면 활성화할 대상이 없으므로 null을 반환한다.
 *
 * @param {string[]} days - 유효한 dayId 목록 (예: ["day1","day2","day3","day4"])
 * @param {string|null|undefined} targetId - 활성화를 시도하는 dayId
 * @returns {string|null}
 */
export function resolveActiveDay(days, targetId) {
  if (!Array.isArray(days) || days.length === 0) {
    return null;
  }
  if (typeof targetId === "string" && days.includes(targetId)) {
    return targetId;
  }
  return days[0];
}

/**
 * 주어진 dayId가 현재 활성 day와 같은지 판정한다. (탭 패널의 active 여부 판단용)
 *
 * @param {string} dayId
 * @param {string|null|undefined} activeDayId
 * @returns {boolean}
 */
export function isDayActive(dayId, activeDayId) {
  return activeDayId != null && dayId === activeDayId;
}

// --------------------------------------------------------------------------
// DOM 바인딩 (브라우저 전용). Node 테스트 환경에는 document 가 없으므로 가드한다.
// --------------------------------------------------------------------------

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = Array.from(document.querySelectorAll("[data-day-tab]"));
    const panels = Array.from(document.querySelectorAll("[data-day-panel]"));

    if (tabButtons.length === 0 || panels.length === 0) {
      return;
    }

    const days = tabButtons.map((btn) => btn.dataset.dayTab);

    function activateDay(targetId) {
      const activeDay = resolveActiveDay(days, targetId);

      tabButtons.forEach((btn) => {
        const active = isDayActive(btn.dataset.dayTab, activeDay);
        btn.setAttribute("aria-selected", active ? "true" : "false");
        btn.tabIndex = active ? 0 : -1;
        btn.classList.toggle("day-tabs__tab--active", active);
      });

      panels.forEach((panel) => {
        const active = isDayActive(panel.dataset.dayPanel, activeDay);
        panel.hidden = !active;
        panel.classList.toggle("day-panel--active", active);
      });
    }

    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        activateDay(btn.dataset.dayTab);
      });

      // 접근성: 좌우 화살표로 탭 간 이동
      btn.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
          return;
        }
        event.preventDefault();
        const currentIndex = days.indexOf(btn.dataset.dayTab);
        const delta = event.key === "ArrowRight" ? 1 : -1;
        const nextIndex = (currentIndex + delta + days.length) % days.length;
        const nextId = days[nextIndex];
        activateDay(nextId);
        const nextBtn = tabButtons.find((b) => b.dataset.dayTab === nextId);
        if (nextBtn) {
          nextBtn.focus();
        }
      });
    });

    // 초기 활성 탭: 첫 번째 day
    activateDay(days[0]);
  });
}
