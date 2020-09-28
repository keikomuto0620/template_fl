import { config, dom, library } from '@fortawesome/fontawesome-svg-core'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

export default () => {
	config.searchPseudoElements = true;
	library.add(faExternalLinkAlt)
	dom.watch();
};