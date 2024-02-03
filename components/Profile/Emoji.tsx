// @ts-nocheck
import React, { useEffect, useRef } from 'react'
import { Emoji } from 'emoji-mart'

export default function EmojiIcon(props) {
  const ref = useRef(null)
  const instance = useRef(null)

  if (instance.current) {
    instance.current.update(props)
  }

  useEffect(() => {
    instance.current = new Emoji({ ...props, ref })

    return () => {
      instance.current = null
    }
  }, [])

  return React.createElement('div', { ref })
}