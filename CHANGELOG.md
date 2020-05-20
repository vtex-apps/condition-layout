# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Update app documentation (README.md file)

## [1.1.6] - 2020-05-08
### Fixed
- Prevent the `ConditionLayout` from rendering nothing after changing the `values` from its context.

## [1.1.5] - 2020-05-06
### Fixed
- Prevent infinite loop from changing the `values` reference in every render.

## [1.1.4] - 2020-05-05
### Fixed
- Bug caused by `null` product and selectedItem.

## [1.1.3] - 2020-04-16

## [1.1.2] - 2020-04-16
### Fixed
- `matched` context value not being recalculated after its invalidation.

## [1.1.1] - 2020-04-13
### Fixed
- Update the condition context `values` when it's externally updated.

## [1.1.0] - 2020-04-13
### Added
- Schemas to components to be able to edit them via Site Editor.
- `condition.product` block.
- `enabled` flag for conditions in the site editor.

## [1.0.1] - 2020-04-08
### Fixed
- Prevent exception when an array subject is not available yet.

## [1.0.0] - 2020-04-06

### Added

- `condition` and `condition.else` and `condition-layout.product` blocks.
