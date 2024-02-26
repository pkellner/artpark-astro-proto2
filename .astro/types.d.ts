declare module 'astro:content' {
	interface Render {
		'.mdoc': Promise<{
			Content(props: Record<string, any>): import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"pages": {
"home/heading.mdoc": {
	id: "home/heading.mdoc";
  slug: "home/heading";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".mdoc"] };
"home/homepage.mdoc": {
	id: "home/homepage.mdoc";
  slug: "home/homepage";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".mdoc"] };
"homenextjs/myhome.mdoc": {
	id: "homenextjs/myhome.mdoc";
  slug: "homenextjs/myhome";
  body: string;
  collection: "pages";
  data: any
} & { render(): Render[".mdoc"] };
};
"posts": {
"first-post.mdoc": {
	id: "first-post.mdoc";
  slug: "first-post";
  body: string;
  collection: "posts";
  data: any
} & { render(): Render[".mdoc"] };
};
"settings": {
"mysettings.mdoc": {
	id: "mysettings.mdoc";
  slug: "mysettings";
  body: string;
  collection: "settings";
  data: any
} & { render(): Render[".mdoc"] };
};
"stations": {
"biometrics-in-healthcare-revolutionizing-patient-identification-and-access-control/content.mdoc": {
	id: "biometrics-in-healthcare-revolutionizing-patient-identification-and-access-control/content.mdoc";
  slug: "biometrics-in-healthcare-revolutionizing-patient-identification-and-access-control/content";
  body: string;
  collection: "stations";
  data: any
} & { render(): Render[".mdoc"] };
"the-benefits-and-drawbacks-of-biometric-security-systems/content.mdoc": {
	id: "the-benefits-and-drawbacks-of-biometric-security-systems/content.mdoc";
  slug: "the-benefits-and-drawbacks-of-biometric-security-systems/content";
  body: string;
  collection: "stations";
  data: any
} & { render(): Render[".mdoc"] };
"the-ethical-concerns-of-biometric-data-collection-and-privacy-protection/content.mdoc": {
	id: "the-ethical-concerns-of-biometric-data-collection-and-privacy-protection/content.mdoc";
  slug: "the-ethical-concerns-of-biometric-data-collection-and-privacy-protection/content";
  body: string;
  collection: "stations";
  data: any
} & { render(): Render[".mdoc"] };
"the-evolution-of-biometrics-from-fingerprinting-to-facial-recognition/content.mdoc": {
	id: "the-evolution-of-biometrics-from-fingerprinting-to-facial-recognition/content.mdoc";
  slug: "the-evolution-of-biometrics-from-fingerprinting-to-facial-recognition/content";
  body: string;
  collection: "stations";
  data: any
} & { render(): Render[".mdoc"] };
};

	};

	type DataEntryMap = {
		"authors": {
"peter-kellner": {
	id: "peter-kellner";
  collection: "authors";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
