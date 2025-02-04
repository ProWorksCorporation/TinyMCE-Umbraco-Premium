import { UmbModalToken } from '@umbraco-cms/backoffice/modal';

export interface TinyMceMediaCaptionAltTextModalData {
	mediaUnique: string;
}

export type TinyMceMediaCaptionAltTextModalValue = {
	altText?: string;
	caption?: string;
	url: string;
};

export const TINYMCE_MEDIA_CAPTION_ALT_TEXT_MODAL = new UmbModalToken<
	TinyMceMediaCaptionAltTextModalData,
	TinyMceMediaCaptionAltTextModalValue
>('TinyMcePremium.Modal.MediaCaptionAltText', {
	modal: {
		type: 'sidebar',
		size: 'small',
	},
});
