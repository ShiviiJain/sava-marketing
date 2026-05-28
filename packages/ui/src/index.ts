// Shared UI components for @sava/web and @sava/mobile
//
// Platform splits use file extensions:
//   Component.tsx         → shared logic / types
//   Component.web.tsx     → web (Next.js) implementation
//   Component.native.tsx  → React Native (mobile) implementation
//
// Keep this package free of platform-specific APIs (no DOM, no RN-only APIs).
// Shared primitives go here; platform shells live in apps/web and apps/mobile.

export { Button, type ButtonVariantProps, buttonVariants } from "./button";
export {
  ButtonGroup,
  ButtonGroupContext,
  type ButtonGroupProps,
  type ButtonGroupSize,
  useButtonGroupSize,
} from "./button-group";
export { cn } from "./cn";
export { OAuthButton, type OAuthButtonProps, type OAuthProvider } from "./oauth-button";
export { SavaLogo, type SavaLogoProps } from "./sava-logo";
export {
  SplitButton,
  type SplitButtonActionProps,
  type SplitButtonItemProps,
  type SplitButtonMenuProps,
  type SplitButtonProps,
} from "./split-button";
export {
  TileRadio,
  TileRadioItem,
  type TileRadioItemProps,
  type TileRadioProps,
} from "./tile-radio";
