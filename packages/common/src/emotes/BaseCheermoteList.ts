import { utf8Length } from '@d-fischer/shared-utils';
import { DataObject } from '../DataObject';

/**
 * The details on how a cheermote should be displayed.
 */
export interface CheermoteDisplayInfo {
	/**
	 * The URL of the image that should be shown.
	 */
	url: string;

	/**
	 * The color that should be used to shown the cheer amount.
	 *
	 * This is a hexadecimal color value, e.g. `#9c3ee8`.
	 */
	color: string;
}

/**
 * A description of a specific cheermote parsed from a message.
 */
export interface MessageCheermote {
	/**
	 * The name of the cheermote.
	 */
	name: string;

	/**
	 * The amount of bits for the cheermote.
	 */
	amount: number;

	/**
	 * The position of the cheermote in the text, zero based.
	 */
	position: number;

	/**
	 * The length of the cheermote in the text.
	 */
	length: number;

	/**
	 * Information on how the cheermote is supposed to be displayed.
	 */
	displayInfo: CheermoteDisplayInfo;
}

/**
 * The type of background a cheermote is supposed to appear on.
 *
 * We will supply a fitting graphic that does not show any artifacts
 * on the given type of background.
 */
export type CheermoteBackground = 'dark' | 'light';

/**
 * The state of a cheermote, i.e. whether it's animated or not.
 */
export type CheermoteState = 'animated' | 'static';

/**
 * The scale of the cheermote, which usually relates to the pixel density of the device in use.
 */
export type CheermoteScale = '1' | '1.5' | '2' | '3' | '4';

/**
 * The format of the cheermote you want to request.
 */
export interface CheermoteFormat {
	/**
	 * The desired background for the cheermote.
	 */
	background: CheermoteBackground;

	/**
	 * The desired cheermote state.
	 */
	state: CheermoteState;

	/**
	 * The desired cheermote scale.
	 */
	scale: CheermoteScale;
}

/** @private */
export abstract class BaseCheermoteList<DataType> extends DataObject<DataType> {
	/**
	 * Gets the URL and color needed to properly represent a cheer of the given amount of bits with the given prefix.
	 *
	 * @param name The name/prefix of the cheermote.
	 * @param bits The amount of bits cheered.
	 * @param format The format of the cheermote you want to request.
	 */
	abstract getCheermoteDisplayInfo(name: string, bits: number, format: CheermoteFormat): CheermoteDisplayInfo;

	/**
	 * Gets all possible cheermote names.
	 */
	abstract getPossibleNames(): string[];

	/**
	 * Parses all the cheermotes out of a message.
	 *
	 * @param message The message.
	 * @param format The format to show the cheermotes in.
	 */
	parseMessage(message: string, format: CheermoteFormat): MessageCheermote[] {
		const result: MessageCheermote[] = [];

		const names = this.getPossibleNames();
		const re = new RegExp('(?<=^|\\s)([a-z]+(?:\\d+[a-z]+)*)(\\d+)(?=\\s|$)', 'gi');
		let match: RegExpExecArray | null = null;
		while ((match = re.exec(message))) {
			const name = match[1].toLowerCase();
			if (names.includes(name)) {
				const amount = Number(match[2]);
				result.push({
					name,
					amount,
					position: utf8Length(message.slice(0, match.index)),
					length: match[0].length,
					displayInfo: this.getCheermoteDisplayInfo(name, amount, format)
				});
			}
		}

		return result;
	}

	/**
	 * Transforms all the cheermotes in a message and returns an array of all the message parts.
	 *
	 * @param message The message.
	 * @param format The format to show the cheermotes in.
	 * @param transformer A function that transforms a message part into an arbitrary structure.
	 */
	transformCheerMessage<T>(
		message: string,
		format: CheermoteFormat,
		transformer: (displayInfo: MessageCheermote) => string | T
	): Array<string | T> {
		const result: Array<string | T> = [];

		let currentPosition = 0;
		for (const foundCheermote of this.parseMessage(message, format)) {
			if (currentPosition < foundCheermote.position) {
				result.push(message.substring(currentPosition, foundCheermote.position));
			}
			result.push(transformer(foundCheermote));
			currentPosition = foundCheermote.position + foundCheermote.length;
		}

		if (currentPosition < message.length) {
			result.push(message.slice(currentPosition));
		}

		return result;
	}
}
