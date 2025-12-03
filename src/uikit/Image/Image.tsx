import { getImageURL } from '@/helpers/getCDNImageHelper/getCDNImageHelper';
import { Component } from '@robocotik/react';

interface ImageProps {
	src?: string;
	alt?: string;
	className?: string;
	getRootRef?: any;
	[key: string]: any;
}

export class Image extends Component<ImageProps> {
	render() {
		const { src, alt, className, getRootRef, ...rest } = this.props;

		if (!src) {
			return <div />;
		}

		const url = getImageURL(src);
		return (
			<img
				alt={alt}
				src={url}
				ref={getRootRef}
				className={className}
				{...rest}
			/>
		);
	}
}
