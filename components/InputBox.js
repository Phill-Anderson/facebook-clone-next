import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/client'
import { VideoCameraIcon } from '@heroicons/react/solid'
import { CameraIcon, EmojiHappyIcon } from '@heroicons/react/outline'
import { db, storage, firebase } from "../firebase"

const InputBox = () => {
    const [session] = useSession()
    const inputRef = React.useRef(null)
    const filepickerRef = React.useRef(null)
    const [imageToPost, setImageToPost] = React.useState(null)

    const sendPost = e => {
        e.preventDefault()
        if (!inputRef.current.value) return

        db.collection('posts').add({
            message: inputRef.current.value,
            name: 'User name 1',
            email: 'phill@gmail.com',
            image: 'https://i1.sndcdn.com/avatars-000130000038-ro6g90-t240x240.jpg',
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(doc => {
            if (imageToPost) {
                const uploadTask = storage.ref(`posts/${doc.id}`)
                    .putString(imageToPost, 'data_url');

                removeImage();

                uploadTask.on('state_change', null, error => console.log(error), () => {
                    // upload амжилттай болвол
                    storage.ref(`posts`).child(doc.id).getDownloadURL().then(url => {
                        db.collection('posts').doc(doc.id).set({
                            postImage: url
                        }, { merge: true })
                    })
                })
            }
        })
        inputRef.current.value = ''
    }
    const addImageToPost = e => {
        // e.preventDefault()
        const reader = new FileReader()
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        }
    }

    const removeImage = () => {
        setImageToPost(null)
    }
    return (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
            <div className='flex space-x-4 items-center'>
                <Image
                    className='rounded-full'
                    src={'https://i1.sndcdn.com/avatars-000130000038-ro6g90-t240x240.jpg'}
                    width={40}
                    height={40}
                    layout='fixed'
                    alt=""
                />
                <form className='flex flex-1'>
                    <input ref={inputRef} className='rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none'
                        type='text' placeholder={`Та юу хийж байна, ${session ? session.user.name : 'хэрэглэгч!'}`}
                    />
                    <button hidden type='submit' onClick={sendPost}>Submit</button>
                </form>
                {
                    imageToPost && (
                        <div onClick={removeImage} className='flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
                            <Image className='h-10 object-contain' src={imageToPost} alt='postImage' />
                        </div>
                    )
                }
            </div>

            <div className='flex justify-evenly p-3 border-t'>
                <div className='inputIcon'>
                    <VideoCameraIcon className='h-7 text-red-500' />
                    <p className='text-xs sm:text-sm'>Live Video</p>
                </div>
                <div onClick={() => filepickerRef.current.click()} className='inputIcon'>
                    <CameraIcon className='h-7 text-green-400' />
                    <p className='text-xs sm:text-sm xl:text-base'>Photo/Video</p>
                    <input ref={filepickerRef} onChange={addImageToPost} type='file' hidden />
                </div>
                <div className='inputIcon'>
                    <EmojiHappyIcon className='h-7 text-yellow-300' />
                    <p className='text-xs sm:text-sm xl:text-base'>Feeling/Activity</p>
                </div>

            </div>
        </div>
    )
}

export default InputBox
