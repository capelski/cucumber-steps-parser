export interface IParsingOptions {
    /**
     * Only the filenames matching this regular expression will be parsed. Defaults to typescript files only (`/^.*\.ts$/`)
     */
    filenameRegExp?: RegExp | string;
    /**
     * Whether the folders found in the given path are recursively parsed. Defaults to true
     */
    recursive?: boolean;
}
