import API from "../../../helpers/api";
import { database } from "../../../firebase_setup/firebase"
import { ref, onValue } from "firebase/database"

export const getAcceptedProposalJobs = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'REQUEST_PROPOSED_ALL_JOB' });
        const { data } = await API.apiGet('acceptProposalJobs')

        if (data) {

            let _data = []
            for (let index = 0; index < data?.response.length; index++) {
                const element = data?.response[index];
                const length = await fetchDataFromDatabase(element, id)

                _data.push({
                    ...element,
                    read: length
                })

            }
            dispatch({ type: `SET_PROPOSED_ALL_JOB`, payload: _data });
        }

    } catch (error) {
        dispatch({ type: `SET_PROPOSED_ALL_JOB`, payload: [] });
    }

}

async function fetchDataFromDatabase(item, userId) {
    try {
        const databaseRef = ref(database, `Chat/jobid${item?.jobId}-proposalid${item?.proposalId}`);
        const snapshot = await new Promise((resolve) => {
            onValue(databaseRef, (snapshot) => {
                resolve(snapshot);
            });
        });

        const _messages = snapshot.val();
        if (_messages) {
            const messageList = Object.keys(_messages)
                ?.map((key) => ({
                    ..._messages[key],
                }))
                ?.sort((a, b) => b.id - a.id)
                ?.filter((_item) => _item.user._id !== userId)
                ?.filter((a) => a.read === false);

            const length = messageList.length;
            return length;
        }
        return 0; // Return 0 if no messages found
    } catch (error) {
        console.error('Error fetching data from the database:', error);
        throw error;
    }
}


// async function fetchDataFromDatabase(item, userId) {
//     try {
//         var length = 0
//         const databaseRef = ref(database, `Chat/jobid${item?.jobId}-proposalid${item?.proposalId}`)
//         onValue(databaseRef, (snapshot) => {
//             const _messages = snapshot.val()
//             if (_messages) {
//                 const messageList = Object.keys(_messages)
//                     ?.map(key => ({
//                         ..._messages[key],
//                     }))
//                     ?.sort((a, b) => b.id - a.id)
//                     ?.filter(_item => _item.user._id !== userId)
//                     ?.filter(a => a.read === false);

//                 length = messageList.length
//                 console.log('length23', length)
//                 return messageList.length;
//             }
//         })
//         return length; // Return 0 if no messages found
//     } catch (error) {
//         console.error('Error fetching data from database:', error);
//         throw error;
//     }
// }

