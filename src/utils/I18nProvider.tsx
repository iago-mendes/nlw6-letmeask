import {ReactNode} from 'react'
import {i18n} from '@lingui/core'
import {I18nProvider as LinguiProvider} from '@lingui/react'
import {
	detect,
	fromUrl,
	fromStorage,
	fromNavigator
} from '@lingui/detect-locale'

import {messages as enMessages} from '../locales/en/messages'
import {messages as ptMessages} from '../locales/pt/messages'

i18n.load('en', enMessages)
i18n.load('pt', ptMessages)
const DEFAULT_FALLBACK = () => 'en'

type LocaleProviderProps = {
	children: ReactNode
}

export function I18nProvider({children}: LocaleProviderProps) {
	const locale = detect(
		fromUrl('lang'),
		fromStorage('lang'),
		fromNavigator(),
		DEFAULT_FALLBACK
	)

	i18n.activate(locale ?? 'en')

	return <LinguiProvider i18n={i18n}>{children}</LinguiProvider>
}
