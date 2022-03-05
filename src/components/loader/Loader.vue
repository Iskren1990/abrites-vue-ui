<template>
  <div class="loader-host"></div>
</template>

<style lang="scss" scoped>
@use "sass:math";
@import "../../styles/core";

$loader-border-size: 0.15em !default;
$loader-speed: 1.1s !default;

.loader-host {
  position: relative;
  outline: 0;
  padding: 0;
  flex-shrink: 0;
  flex-grow: 0;
  background: none;
  color: inherit;
  font-size: inherit;
  display: none;
  vertical-align: middle;
  box-sizing: border-box;
  font-size: 2.1em;
  width: 1em;
  height: 1em;
  margin: 10px;
  user-select: none;
  border-color: $txt-secondary-color;
  &[active="true"],
  &.active {
    display: inline-block;
  }
  &[small],
  &.small {
    font-size: 1.5em;
  }
  &[large],
  &.large {
    font-size: 2.6em;
  }

  &:before {
    content: "";
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-width: $loader-border-size;
    border-style: solid;
    border-color: inherit;
    opacity: 0.3;
    box-sizing: border-box;
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border-width: $loader-border-size;
    border-style: solid;
    border-color: inherit;
    border-left-color: transparent;
    border-right-color: transparent;
    border-bottom-color: transparent;
    box-sizing: border-box;
    display: none;
  }
  &[active="true"]:after,
  &.active:after {
    display: block;
    animation: loader $loader-speed linear infinite;
  }

  &[accent],
  &.accent {
    border-color: $accent-color;
  }
  &[danger],
  &.danger {
    border-color: $danger-color;
  }
  &[success],
  &.success {
    border-color: $success-color;
  }
  &[warning],
  &.warning {
    border-color: $warning-color;
  }
  &[light],
  &.light {
    border-color: $border-color;
  }
  &[dark],
  &.dark {
    border-color: $overlay-color;
  }
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
