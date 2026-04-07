/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

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

/**
 * Trying out reference guide
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/
 */
export default function Edit( { attributes, setAttributes } ) {
	const { content } = attributes;

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } )
	};

	return (
		<div { ...useBlockProps() }>
			<RichText
				tagName='p' // The tag that will be rendered
				value={ content } // The current value from attributes
				onChange={ onChangeContent } // The function to run on every keystore
				placeholder={ __( 'Type your block content here...' , 'my-first-block' ) }
				className="agency-test-class" 
			/>
		</div>
	);
}