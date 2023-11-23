"use client";

import { IconLoader2, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { useRef, useState } from 'react';

interface Props {
    className?: string;
}

export default function ReadSonic({ className }: Props) {
    const audio = useRef<HTMLAudioElement>(null);
    const [paused, setPaused] = useState(true);
    const [loading, setLoading] = useState(false);

    function sourceLoaded() {
        return Boolean(document.getElementById('audio-source'));
    }

    function togglePlay() {
        if (audio.current?.paused) {
            audio.current?.play();
            setPaused(false);
        } else {
            audio.current?.pause();
            setPaused(true);
        }
    }

    audio.current?.addEventListener('pause', () => {
        setPaused(true);
    });

    audio.current?.addEventListener('play', () => {
        setPaused(false);
    });

    async function tts() {
        if (sourceLoaded()) {
            togglePlay();
            return;
        }

        if (loading) {
            return;
        }

        setLoading(true);
        const payload = {
            "origin": window.location.origin,
            "slug": window.location.pathname,
            "voice": String(process.env.NEXT_PUBLIC_READSONIC_VOICE),
        };
        fetch('https://api.readsonic.io/synthesize', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            
            return response.json();
        })
        .then((data) => {
            let source = document.createElement('source');
            source.id = 'audio-source';
            source.type = 'audio/mpeg';
            source.src = data.content;
            audio.current?.appendChild(source);
            
            audio.current?.classList.add('w-[35rem]');
            audio.current?.classList.remove('hidden');
            audio.current?.classList.add('block');
            audio.current?.play();
            setPaused(false);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }

    return (
        <>
        <button className={className} onClick={tts}>
            {loading ? ( 
                <IconLoader2 className="animate-spin" /> ) : (
                sourceLoaded() ? (
                    paused ? <IconPlayerPlay /> : <IconPlayerPause />
                ) : (
                    <IconPlayerPlay />
                )
            )}
        </button>
        <div className='fixed bottom-4 left-0 w-full flex justify-center items-center'>
            <audio id="audio" ref={audio} controls className="hidden">
                Your browser does not support the <code>audio</code> element.
            </audio>
        </div>
        </>
    )
}
