import { marked } from 'marked';
import { ReadStream } from 'node:fs';
import { Readable } from 'node:stream';

export function renderMD([start, ...tokens], ...props) {
    const streams = [start];
    for (let i = 0; i < tokens.length; i++) {
        if (props[i] instanceof ReadStream) {
            streams.push(props[i].compose(async function* (chunk) {
                for await (const buffer of chunk){
                    yield marked(buffer.toString());
                }
            }));
        } else {
            streams.push(props[i]); //TODO: stringify primitives
        }
        streams.push(tokens[i]); 
    }
    return Readable.from(streams).flatMap(data => data);
}