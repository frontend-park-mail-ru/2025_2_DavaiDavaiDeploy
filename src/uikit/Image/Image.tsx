import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { Component } from '@/modules/react';

interface ImageProps {
	src?: string;
	alt?: string;
	className?: string;
	getRootRef?: any;
}

export class Image extends Component<ImageProps> {
	render() {
		const { src, alt, className, getRootRef } = this.props;

		if (!src) {
			return <div />;
		}

		const url = getImageURL(src);
		return <img alt={alt} src={url} ref={getRootRef} className={className} />;
	}
}
