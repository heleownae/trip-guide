// tests/tab-logic.test.mjs
// Slice 3: Day 탭 전환의 핵심 판단 로직(순수 함수) 테스트.
// 실행: node --test tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveActiveDay, isDayActive } from "../script.js";

const DAYS = ["day1", "day2", "day3", "day4"];

test("resolveActiveDay: 유효한 targetId가 주어지면 그대로 반환한다", () => {
  assert.equal(resolveActiveDay(DAYS, "day3"), "day3");
});

test("resolveActiveDay: 목록의 첫 번째 dayId도 정상적으로 반환한다", () => {
  assert.equal(resolveActiveDay(DAYS, "day1"), "day1");
});

test("resolveActiveDay: 목록의 마지막 dayId도 정상적으로 반환한다", () => {
  assert.equal(resolveActiveDay(DAYS, "day4"), "day4");
});

test("resolveActiveDay: 목록에 없는 targetId는 첫 번째 dayId로 폴백한다", () => {
  assert.equal(resolveActiveDay(DAYS, "day99"), "day1");
});

test("resolveActiveDay: targetId가 null이면 첫 번째 dayId로 폴백한다", () => {
  assert.equal(resolveActiveDay(DAYS, null), "day1");
});

test("resolveActiveDay: targetId가 undefined면 첫 번째 dayId로 폴백한다", () => {
  assert.equal(resolveActiveDay(DAYS, undefined), "day1");
});

test("resolveActiveDay: 빈 배열이 주어지면 null을 반환한다", () => {
  assert.equal(resolveActiveDay([], "day1"), null);
});

test("isDayActive: dayId와 activeDayId가 같으면 true", () => {
  assert.equal(isDayActive("day2", "day2"), true);
});

test("isDayActive: dayId와 activeDayId가 다르면 false", () => {
  assert.equal(isDayActive("day1", "day2"), false);
});

test("isDayActive: activeDayId가 null이면 항상 false", () => {
  assert.equal(isDayActive("day1", null), false);
});
