/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 *	Block Editor components and hooks.
 * 	
 * 	- useBlockProps: Standard hook to apply block wrapper attributes and styles.
 *  - RichText: The editable text component with formatting support.
 *  - InspectorControls: Container for settings that appear in the Sidebar (Right panel).
 *  - BlockControls: Container for the Toolbar that floats above a selected block.
 *  - AlignmentControl: A specialized UI component for Text Alignment (Left, Center, Right).
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	RichText,
	InspectorControls,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';

/**
 * Generic WordPress UI components.
 * 
 * - PanelBody: A collapsible container used to organize settings in the sidebar.
 * - ColorPalette: A visual selector for choosing colors from a predefined set.
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import {
	PanelBody,
	ColorPalette
} from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
// export default function Edit() {
// 	return (
// 		<p { ...useBlockProps() }>
// 			{ __(
// 				'My First Block – hello from the editor!',
// 				'my-first-block'
// 			) }
// 		</p>
// 	);
// }

// Brand Colors
const BRAND_COLORS = [
	{ name: 'Agency Blue', color: '#0073aa' },
	{ name: 'Premium Black', color: '#191e23' },
	{ name: 'Clean White', color: '#ffffff' },
	{ name: 'Accent Orange', color: '#ffad00' },
];

/**
 * Trying out reference guide
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/
 */
export default function Edit( { attributes, setAttributes } ) {
	// Destructure the attributes we defined in block.json
	const { content, backgroundColor, textAlign } = attributes;

	// Handler for text changes
	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
	};

	// Handler for color changes
	const onChangeBackgroundColor = ( newColor ) => {
		setAttributes( { backgroundColor: newColor } );
	};

	// Handler for alignment
	const onChangeAlignment = ( newAlign ) => {
		setAttributes( { textAlign: newAlign } );
	};

	return (
		<>
			{ /* 1. The Sidebar (Inspector Controls) */}
			<InspectorControls>
				<PanelBody title={ __( 'Appearance Settings', 'my-first-block' ) }>
						<p>{ __( 'Background Color', 'my-first-block' ) }</p>
						<ColorPalette
								colors={ BRAND_COLORS } // Restrict color choices
								disableCustomColors={ true } // Lock the brand
								value={ backgroundColor }
								onChange={ onChangeBackgroundColor }
						/>
				</PanelBody>
			</InspectorControls>

			{ /* 2. The Block Interface */ }
			<BlockControls>
				<AlignmentControl
					value={ textAlign }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>

			{ /* 3. The Block Interface (The actual content) */}
			<div
				{ ...useBlockProps( {
					style: {
						backgroundColor: backgroundColor,
						textAlign: textAlign
					},
					className: 'agency-test-class'
				} ) }
			>
				<RichText
					tagName="p"
					value={ content }
					onChange={ onChangeContent }
					placeholder={ __( 'Type your block content here...', 'my-first-block' ) }				
				/>
			</div>
		
		</>
	);
}