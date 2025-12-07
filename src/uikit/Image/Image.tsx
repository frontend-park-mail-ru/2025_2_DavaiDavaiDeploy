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

		return (
			<img
				alt={alt}
				src={src}
				ref={getRootRef}
				className={className}
				{...rest}
			/>
		);
	}
}
