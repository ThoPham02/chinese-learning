import React, { useRef, useState } from 'react';
import { Word } from '../../types';
import { Check, MicroscopeIcon, X } from 'lucide-react';
import { checkSpeaking } from '../../store/service';

type ListenRepeatProps = {
    type: number;
    word: Word;
    onAnswer: (isCorrect: boolean) => void;
    onNext: () => void;
};

const ListenRepeat: React.FC<ListenRepeatProps> = ({ type, word, onAnswer, onNext }) => {
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const [isCorrect, setIsCorrect] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [comment, setComment] = useState('');

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                chunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });

                const formData = new FormData();
                formData.append('file', blob, 'recording.webm');
                formData.append('expectedText', word.hanzi);

                const res = await checkSpeaking(formData);

                setShowFeedback(true);
                setComment(res.feedback)
                setIsCorrect(res.isCorrect);

                if (res.isCorrect) {
                    onAnswer(true);

                    setTimeout(() => {
                        setShowFeedback(false);
                        onNext();
                    }, 1500);
                }
            };

            mediaRecorder.start();
        } catch (err) {
            console.error('Không thể truy cập micro:', err);
        }
    };

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
    };

    console.log(type);

    return (
        <div>
            <div className="text-2xl mb-4">Phát âm từ sau:</div>
            <div className="mb-3 h-full w-full flex flex-col justify-center items-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{word.hanzi}</h2>
                <div className="flex flex-row items-center">
                    <p className="text-xl text-blue-600 mb-4">{word.pinyin}</p>
                    <p className="text-xl text-blue-600 mb-4 mx-1">-</p>
                    <p className="text-xl text-blue-600 mb-4">{word.meaning}</p>
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <button
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onTouchStart={startRecording}
                    onTouchEnd={stopRecording}
                    className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-95 transition"
                >
                    <MicroscopeIcon className="text-white text-2xl" />
                </button>
            </div>

            {showFeedback && (
              <div className={`mt-4 p-3 rounded-lg ${
                isCorrect
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                <div className="flex items-start">
                  {isCorrect ? (
                    <Check className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium">
                      {isCorrect
                        ? 'Chính xác!'
                        : <>{comment}</>}
                    </p>
                  </div>
                </div>
              </div>
            )}
        </div>
    );
};

export default ListenRepeat;
