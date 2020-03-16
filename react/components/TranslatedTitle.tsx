import React, { FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

// The b-s token makes the `b` class be applied only on mobile devices.
const TranslatedTile: FunctionComponent<TranslatedTileProps> = ({ title }) => {
  const titleText = title || <FormattedMessage id="base.title" />
  return (
    <div className="flex flex-grow-1 justify-center b-s">
      <span className="t-heading-4">{titleText}</span>
    </div>
  )
}

interface TranslatedTileProps {
  title?: string
}

export default TranslatedTile
