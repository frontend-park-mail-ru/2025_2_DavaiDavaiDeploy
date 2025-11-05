type ValueType = string | number | readonly string[];

declare global {
	namespace JSX {
		// Base props common to most elements
		interface BaseHTMLAttributes {
			key?: string | number | null;
			class?: string;
			className?: string;
			style?: Record<string, string | number>;
			id?: string;
			title?: string;
			lang?: string;
			tabIndex?: number;
			role?: string; // ARIA

			// Event Handlers
			onClick?: (event: MouseEvent) => void;
			onChange?: (event: Event) => void;
			onSubmit?: (event: Event) => void;
			onInput?: (event: InputEvent) => void;
			onFocus?: (event: FocusEvent) => void;
			onBlur?: (event: FocusEvent) => void;
			onKeyDown?: (event: KeyboardEvent) => void;
			onKeyUp?: (event: KeyboardEvent) => void;
			onKeyPress?: (event: KeyboardEvent) => void;
			onMouseDown?: (event: MouseEvent) => void;
			onMouseUp?: (event: MouseEvent) => void;
			onMouseEnter?: (event: MouseEvent) => void;
			onMouseLeave?: (event: MouseEvent) => void;
			onTouchStart?: (event: TouchEvent) => void;
			onTouchEnd?: (event: TouchEvent) => void;
			onTouchMove?: (event: TouchEvent) => void;

			// Data attributes
			[key: `data-${string}`]: any;

			// Allow any other string-based attribute as a fallback
			[key: string]: any;
		}

		interface IntrinsicElements {
			// Core Elements
			div: BaseHTMLAttributes;
			span: BaseHTMLAttributes;
			p: BaseHTMLAttributes;
			i: BaseHTMLAttributes;
			b: BaseHTMLAttributes;
			strong: BaseHTMLAttributes;
			em: BaseHTMLAttributes;
			small: BaseHTMLAttributes;
			sub: BaseHTMLAttributes;
			sup: BaseHTMLAttributes;
			br: BaseHTMLAttributes;
			hr: BaseHTMLAttributes;

			// Headings
			h1: BaseHTMLAttributes;
			h2: BaseHTMLAttributes;
			h3: BaseHTMLAttributes;
			h4: BaseHTMLAttributes;
			h5: BaseHTMLAttributes;
			h6: BaseHTMLAttributes;

			// Links and Media
			a: BaseHTMLAttributes & {
				href?: string;
				target?: string;
				rel?: string;
				download?: boolean | string;
			};
			img: BaseHTMLAttributes & {
				src?: string;
				alt?: string;
				width?: string | number;
				height?: string | number;
				loading?: 'eager' | 'lazy';
			};

			video: BaseHTMLAttributes & {
				src?: string;
				alt?: string;
				width?: string | number;
				height?: string | number;
				loading?: 'eager' | 'lazy';
				autoplay?: boolean;
				loop?: boolean;
				muted?: boolean;
				playsInline?: boolean;
				controls?: boolean;
				poster?: string;
			};

			// Lists
			ul: BaseHTMLAttributes;
			ol: BaseHTMLAttributes & {
				start?: number;
				type?: '1' | 'a' | 'A' | 'i' | 'I';
				reversed?: boolean;
			};
			li: BaseHTMLAttributes & {
				value?: number;
			};

			// Forms
			form: BaseHTMLAttributes & {
				action?: string;
				method?: 'GET' | 'POST';
				encType?: string;
				target?: string;
				noValidate?: boolean;
			};
			input: BaseHTMLAttributes & {
				type?: string;
				value?: ValueType;
				checked?: boolean;
				placeholder?: string;
				disabled?: boolean;
				name?: string;
				required?: boolean;
				readOnly?: boolean;
				min?: string | number;
				max?: string | number;
				step?: string | number;
				multiple?: boolean;
				pattern?: string;
				accept?: string;
			};
			button: BaseHTMLAttributes & {
				type?: 'button' | 'submit' | 'reset';
				disabled?: boolean;
				name?: string;
				value?: string;
			};
			label: BaseHTMLAttributes & {
				htmlFor?: string;
			};
			textarea: BaseHTMLAttributes & {
				value?: string | number | readonly string[];
				placeholder?: string;
				disabled?: boolean;
				name?: string;
				required?: boolean;
				readOnly?: boolean;
				rows?: number;
				cols?: number;
				wrap?: 'hard' | 'soft' | 'off';
			};
			select: BaseHTMLAttributes & {
				value?: string | number | readonly string[];
				disabled?: boolean;
				name?: string;
				required?: boolean;
				multiple?: boolean;
				size?: number;
			};
			option: BaseHTMLAttributes & {
				value?: string | number;
				disabled?: boolean;
				selected?: boolean;
				label?: string;
			};
			optgroup: BaseHTMLAttributes & {
				label?: string;
				disabled?: boolean;
			};
			fieldset: BaseHTMLAttributes & {
				disabled?: boolean;
				name?: string;
			};
			legend: BaseHTMLAttributes;

			// Tables
			table: BaseHTMLAttributes;
			caption: BaseHTMLAttributes;
			thead: BaseHTMLAttributes;
			tbody: BaseHTMLAttributes;
			tfoot: BaseHTMLAttributes;
			tr: BaseHTMLAttributes;
			th: BaseHTMLAttributes & {
				scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
				colSpan?: number;
				rowSpan?: number;
			};
			td: BaseHTMLAttributes & {
				colSpan?: number;
				rowSpan?: number;
			};
			colgroup: BaseHTMLAttributes;
			col: BaseHTMLAttributes & {
				span?: number;
			};

			// Semantic/Layout Elements
			header: BaseHTMLAttributes;
			footer: BaseHTMLAttributes;
			main: BaseHTMLAttributes;
			nav: BaseHTMLAttributes;
			section: BaseHTMLAttributes;
			article: BaseHTMLAttributes;
			aside: BaseHTMLAttributes;
			address: BaseHTMLAttributes;
			figure: BaseHTMLAttributes;
			figcaption: BaseHTMLAttributes;

			// Details & Dialog
			details: BaseHTMLAttributes & {
				open?: boolean;
			};
			summary: BaseHTMLAttributes;
			dialog: BaseHTMLAttributes & {
				open?: boolean;
			};

			// Other
			blockquote: BaseHTMLAttributes & {
				cite?: string;
			};
			pre: BaseHTMLAttributes;
			code: BaseHTMLAttributes;
			svg: BaseHTMLAttributes & {
				viewBox?: string;
				xmlns?: string;
			};
			path: BaseHTMLAttributes & {
				d?: string;
				fill?: string;
				stroke?: string;
			};
			// SVG
			svg: App.SVGProps<SVGSVGElement>;

			animate: App.SVGProps<SVGElement>;
			animateMotion: App.SVGProps<SVGElement>;
			animateTransform: App.SVGProps<SVGElement>;
			circle: App.SVGProps<SVGCircleElement>;
			clipPath: App.SVGProps<SVGClipPathElement>;
			defs: App.SVGProps<SVGDefsElement>;
			desc: App.SVGProps<SVGDescElement>;
			ellipse: App.SVGProps<SVGEllipseElement>;
			feBlend: App.SVGProps<SVGFEBlendElement>;
			feColorMatrix: App.SVGProps<SVGFEColorMatrixElement>;
			feComponentTransfer: App.SVGProps<SVGFEComponentTransferElement>;
			feComposite: App.SVGProps<SVGFECompositeElement>;
			feConvolveMatrix: App.SVGProps<SVGFEConvolveMatrixElement>;
			feDiffuseLighting: App.SVGProps<SVGFEDiffuseLightingElement>;
			feDisplacementMap: App.SVGProps<SVGFEDisplacementMapElement>;
			feDistantLight: App.SVGProps<SVGFEDistantLightElement>;
			feDropShadow: App.SVGProps<SVGFEDropShadowElement>;
			feFlood: App.SVGProps<SVGFEFloodElement>;
			feFuncA: App.SVGProps<SVGFEFuncAElement>;
			feFuncB: App.SVGProps<SVGFEFuncBElement>;
			feFuncG: App.SVGProps<SVGFEFuncGElement>;
			feFuncR: App.SVGProps<SVGFEFuncRElement>;
			feGaussianBlur: App.SVGProps<SVGFEGaussianBlurElement>;
			feImage: App.SVGProps<SVGFEImageElement>;
			feMerge: App.SVGProps<SVGFEMergeElement>;
			feMergeNode: App.SVGProps<SVGFEMergeNodeElement>;
			feMorphology: App.SVGProps<SVGFEMorphologyElement>;
			feOffset: App.SVGProps<SVGFEOffsetElement>;
			fePointLight: App.SVGProps<SVGFEPointLightElement>;
			feSpecularLighting: App.SVGProps<SVGFESpecularLightingElement>;
			feSpotLight: App.SVGProps<SVGFESpotLightElement>;
			feTile: App.SVGProps<SVGFETileElement>;
			feTurbulence: App.SVGProps<SVGFETurbulenceElement>;
			filter: App.SVGProps<SVGFilterElement>;
			foreignObject: App.SVGProps<SVGForeignObjectElement>;
			g: App.SVGProps<SVGGElement>;
			image: App.SVGProps<SVGImageElement>;
			line: App.SVGLineElementAttributes<SVGLineElement>;
			linearGradient: App.SVGProps<SVGLinearGradientElement>;
			marker: App.SVGProps<SVGMarkerElement>;
			mask: App.SVGProps<SVGMaskElement>;
			metadata: App.SVGProps<SVGMetadataElement>;
			mpath: App.SVGProps<SVGElement>;
			path: App.SVGProps<SVGPathElement>;
			pattern: App.SVGProps<SVGPatternElement>;
			polygon: App.SVGProps<SVGPolygonElement>;
			polyline: App.SVGProps<SVGPolylineElement>;
			radialGradient: App.SVGProps<SVGRadialGradientElement>;
			rect: App.SVGProps<SVGRectElement>;
			stop: App.SVGProps<SVGStopElement>;
			switch: App.SVGProps<SVGSwitchElement>;
			symbol: App.SVGProps<SVGSymbolElement>;
			text: App.SVGTextElementAttributes<SVGTextElement>;
			textPath: App.SVGProps<SVGTextPathElement>;
			tspan: App.SVGProps<SVGTSpanElement>;
			use: App.SVGProps<SVGUseElement>;
			view: App.SVGProps<SVGViewElement>;
		}

		// --- Explicit Definitions for Component Props and Children ---

		/**
		 * Defines the property name used for passing attributes to components.
		 * TypeScript uses this to know where to type-check the props object.
		 */
		interface ElementAttributesProperty {
			props: {}; // The name 'props' is conventional. Type {} is a placeholder.
		}

		/**
		 * Defines the property name used for passing children to components.
		 * TypeScript uses this to know where children are placed within the props object.
		 */
		interface ElementChildrenAttribute {
			children: {}; // The name 'children' is conventional. Type {} is a placeholder.
		}

		// --- End Explicit Definitions ---
	}
}

export {};
