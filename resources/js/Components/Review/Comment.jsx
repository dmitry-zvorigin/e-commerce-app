import { ArrowUturnLeftIcon, HandThumbDownIcon, HandThumbUpIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useCollapse } from "react-collapsed";


// export default function Comment({ comments }) {

//     const [isFormExpanded, setFormExpanded] = useState(false);
//     const [isReplyFormExpanded, setReplyFormExpanded] = useState(false);
//     const [areRepliesExpanded, setRepliesExpanded] = useState(false);

//     const { getCollapseProps: getFormCollapseProps, getToggleProps: getFormToggleProps } = useCollapse({ isExpanded: isFormExpanded });
//     const { getCollapseProps: getReplyCollapseProps, getToggleProps: getReplyToggleProps } = useCollapse({ isExpanded: isReplyFormExpanded });
//     const { getCollapseProps: getRepliesCollapseProps, getToggleProps: getRepliesToggleProps } = useCollapse({ isExpanded: areRepliesExpanded });
    
//     return (
//         <div className="ml-12">

//             <div>
//                 <Form/>
//             </div>

//             <div>

//                 {comments && comments.map(comment => (
//                     <div key={comment.id}>
//                         <CommentDetail isReply={false} comment={comment} />
                    
//                         <div className="flex justify-between items-center gap-6">
//                             <div className="flex items-center gap-6">

//                                 <ReactionButtons averageReactions={-84}/>

//                                 <div className="text-blue-600 hover:text-orange-400">
//                                 <button
//                                     {...getReplyToggleProps({
//                                         onClick: () => setReplyFormExpanded(!isReplyFormExpanded)
//                                     })}
//                                 >
//                                     Ответить
//                                 </button>
//                                 </div>
//                             </div>

//                             <button
//                                 className="text-blue-600 hover:text-orange-400"
//                                 {...getRepliesToggleProps({
//                                     onClick: () => setRepliesExpanded(!areRepliesExpanded)
//                                 })}
//                             >
//                                 {areRepliesExpanded ? 'Скрыть ответы (3)' : 'Показать ответы (3)'}
//                             </button>
//                         </div>

                
//                     {comment.comments && comment.comments.map(reply => 
//                         <div className="ml-12 mt-5" key={reply.id}>

//                             <div {...getReplyCollapseProps()}>
//                                 <Form isReply={true} onCancel={() => setReplyFormExpanded(false)}/>
//                             </div>
        
//                             <div {...getRepliesCollapseProps()} className="border-l-2 pl-5">
        
//                                 <CommentDetail isReply={true} comment={{reply}}/>
        
//                                 <div className="flex justify-between items-center gap-6">
//                                     <div className="flex items-center gap-6">
        
//                                         <ReactionButtons averageReactions={123}/>
        
//                                         <div className="text-blue-600 hover:text-orange-400">
//                                         <button
//                                             {...getFormToggleProps({
//                                                 onClick: () => setFormExpanded(!isFormExpanded)
//                                             })}
//                                         >
//                                             Ответить
//                                         </button>
//                                         </div>
//                                     </div>
        
//                                 </div>
        
//                                 <div className="ml-12 mt-5">
//                                     <div {...getFormCollapseProps()}>
//                                         <Form isReply={true} onCancel={() => setFormExpanded(false)}/>                              
//                                     </div>
//                                 </div>
        
//                             </div>
        
//                         </div>
//                     )}

//                 </div>
//                 ))}

//             </div>
//         </div>
//     );
// }


// const Form = ({ isReply, onCancel }) => {
//     return (
//         <>
//             <textarea className="w-full border rounded-lg" placeholder="Написать комментарий..."/>
//             <div className="flex justify-end gap-2">

//                 {isReply && (
//                     <button
//                         className="border w-32 h-12 rounded-lg hover:bg-gray-200"
//                         onClick={onCancel}
//                     >
//                         Отменить
//                     </button>
//                 )}

//                 <button
//                     className="border w-32 h-12 rounded-lg bg-orange-400 text-white hover:bg-orange-300"
//                 >
//                     Отправить
//                 </button>
//             </div>
//         </>
//     );
// }

// const CommentDetail = ({ isReply, comment }) => {

//     return (
//         <>
//             <div className="flex items-center font-bold ">
//                 <div className="border rounded-full p-1 border-black mr-2">
//                     <UserIcon className="w-7 h-7"/>
//                 </div>
//                 <button className="text-blue-700">{comment.user.email}</button>
//             </div>

//             <div className="flex gap-2 items-center">
//                 {isReply && (
//                     <button className="text-sm hover:text-orange-400 flex gap-2">
//                         <ArrowUturnLeftIcon className="w-4 h-4"/>
//                         Name
//                     </button>
//                 )}

//                 <p className="text-gray-400 text-sm">7 июня 2024 г. 10:37</p>
                
//             </div>

//             <div className="my-2">
//                 <p className="">{comment.content}</p>
//             </div>
//         </>
//     );
// }

// const ReactionButtons = ({ averageReactions }) => {
    
//     return (
//         <>
//             <div className="flex items-center">
//                 <button className="m-2"><HandThumbUpIcon className="h-7 w-7 hover:text-green-800"/></button>
//                 <div 
//                     className={
//                             `border border-gray-300 rounded-lg p-1 bg-gray-300 font-bold
//                             ${averageReactions < 0 ? 'text-red-600' : 'text-green-600'} 
//                         `}
//                 >
//                     {averageReactions}
//                 </div>
                
//                 <button className="m-2"><HandThumbDownIcon className="h-7 w-7 hover:text-red-800"/></button>
//             </div>
//         </>
//     );
// }

export default function Comment({ comments }) {

    return (
        <div className="">
            <Form />
            {comments && comments.map(comment => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

const CommentItem = ({ comment, reply = false }) => {
    const [isReplyFormExpanded, setReplyFormExpanded] = useState(false);

    const { getCollapseProps: getReplyCollapseProps, getToggleProps: getReplyToggleProps } = useCollapse({ isExpanded: isReplyFormExpanded });

    return (
        <div className={reply ?  "" : "ml-10 " }>
            <div className="mb-5 mt-5">
                <CommentDetail isReply={false} comment={comment} />
            </div>
            
            <div {...getReplyCollapseProps()} className="ml-10 ">
                <div className="mt-5">
                    <Form isReply={true} onCancel={() => setReplyFormExpanded(false)} />
                </div>
            </div>

        </div>
    );
}

const Form = ({ isReply, onCancel }) => {
    return (
        <>
            <textarea className="w-full border rounded-lg" placeholder="Написать комментарий..." />
            <div className="flex justify-end gap-2">
                {isReply && (
                    <button
                        className="border w-32 h-12 rounded-lg hover:bg-gray-200"
                        onClick={onCancel}
                    >
                        Отменить
                    </button>
                )}
                <button
                    className="border w-32 h-12 rounded-lg bg-orange-400 text-white hover:bg-orange-300"
                >
                    Отправить
                </button>
            </div>
        </>
    );
}

const CommentDetail = ({ isReply, comment }) => {

    const [isReplyFormExpanded, setReplyFormExpanded] = useState(false);
    const [areRepliesExpanded, setRepliesExpanded] = useState(false);

    const { getCollapseProps: getReplyCollapseProps, getToggleProps: getReplyToggleProps } = useCollapse({ isExpanded: isReplyFormExpanded });
    const { getCollapseProps: getRepliesCollapseProps, getToggleProps: getRepliesToggleProps } = useCollapse({ isExpanded: areRepliesExpanded });

    return (
        <>
            <div className="flex items-center font-bold ">
                <div className="border rounded-full p-1 border-black mr-2">
                    <UserIcon className="w-7 h-7" />
                </div>
                <button className="text-blue-700">{comment.user.email}</button>
            </div>
            <div className="flex gap-2 items-center">
                {isReply && (
                    <button className="text-sm hover:text-orange-400 flex gap-2">
                        <ArrowUturnLeftIcon className="w-4 h-4" />
                        {comment.user_reply.email}
                    </button>
                )}
                {/* <p className="text-gray-400 text-sm">7 июня 2024 г. 10:37</p> */}
                <p className="text-gray-400 text-sm">{comment.created_at}</p>
            </div>
            <div className="my-2">
                <p className="">{comment.content}</p>
            </div>

            <div className="flex justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                    <ReactionButtons averageReactions={comment.averageReactions || 0} />
                    <div className="text-blue-600 hover:text-orange-400">
                        <button
                            {...getReplyToggleProps({
                                onClick: () => setReplyFormExpanded(!isReplyFormExpanded)
                            })}
                        >
                            Ответить
                        </button>
                    </div>
                </div>
                {comment.replies && comment.replies.length > 0 && (
                    <button
                        className="text-blue-600 hover:text-orange-400"
                        {...getRepliesToggleProps({
                            onClick: () => setRepliesExpanded(!areRepliesExpanded)
                        })}
                    >
                        {areRepliesExpanded ? 'Скрыть ответы' : `Показать ответы (${comment.replies.length})`}
                    </button>
                )}
            </div>

            <div {...getReplyCollapseProps()} className="ml-10 ">
                <div className="mt-5">
                    <Form isReply={true} onCancel={() => setReplyFormExpanded(false)} />
                </div>
            </div>

            <div {...getRepliesCollapseProps()} className="border-l-2 ml-10">
                {comment.replies && comment.replies.map(reply => (
                    <div key={reply.id} className="mt-10 ml-3">
                        <CommentDetail isReply={true} comment={reply}/>
                    </div>
                ))}
            </div>

        </>
    );
}

const ReactionButtons = ({ averageReactions }) => {
    return (
        <>
            <div className="flex items-center">
                <button className="m-2"><HandThumbUpIcon className="h-5 w-5 hover:text-green-800" /></button>
                <div
                    className={`border border-gray-300 rounded-lg p-1 bg-gray-300 font-bold
                    ${averageReactions < 0 ? 'text-red-600' : 'text-green-600'} 
                `}
                >
                    {averageReactions}
                </div>
                <button className="m-2"><HandThumbDownIcon className="h-5 w-5 hover:text-red-800" /></button>
            </div>
        </>
    );
}