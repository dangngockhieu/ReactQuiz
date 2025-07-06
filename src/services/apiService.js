import axios from '../utils/axiosCustomize';
const postCreateNewUser = (email, password, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}
const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}
const putUpdateUser = (id, username, role, image) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}
const deleteUser = (id) => {
    return axios.delete('api/v1/participant', {data:{id:id}});
}
const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}
const postLogin = (email, password) => {
     return axios.post('api/v1/login',{email, password});
}
const postSignUp = (email, username, password)=>{
    return axios.post('api/v1/register',{email, username, password});
}
const getQuizByUser =() =>{
    return axios.get('api/v1/quiz-by-participant');
}
const getDataQuiz=(quizId) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
}
const postSubmitQuiz = (data) => {
    return axios.post(`api/v1/quiz-submit`, {...data});
}
const postCreateNewQuiz= (description, name, difficulty, quizImage) => {
    //submit data
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.post('api/v1/quiz', data);
}
const getAllQuizForAdmin=() => {
    return axios.get(`api/v1/quiz/all`);
}
const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}
const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    //submit data
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.put('api/v1/quiz', data);
}
const postCreateNewQuestion = (id, description, questionImage) => {
    const data = new FormData();
    data.append('quiz_id', id);
    data.append('description', description)
    data.append('questionImage', questionImage);
    return axios.post('api/v1/question', data);
}
const postCreateNewAnswer = (description, correcct_answer, question_id) => {
    return axios.post('api/v1/answer', {
        description, correcct_answer, question_id
    });
}
const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId });
}
const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}
const postUpsertQA = (data)=>{
    return axios.post(`api/v1/quiz-upsert-qa`, {...data});
}
const Logout =(email, refresh_token)=>{
    return axios.post(`api/v1/logout`, {email, refresh_token});
}
const getOverview = () => {
    return axios.get(`api/v1/overview`);
}
const refreshToken =(email, refresh_token)=>{
    return axios.post(`api/v1/refresh-token`, {email, refresh_token});
}
const changePassword = (email, current_password, new_password) => {
    return axios.post('api/v1/change-password', { email, current_password, new_password });
}
const getHistory = () => {
    return axios.get('api/v1/history');
}
const updateProfile = (username, userImage) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImage', userImage);
    return axios.post('api/v1/profile', data);
}
export {postCreateNewUser, getAllUsers, 
    putUpdateUser, deleteUser, 
    getUserWithPaginate, postLogin, 
    postSignUp, getQuizByUser,
    getDataQuiz, postSubmitQuiz,
    postCreateNewQuiz, getAllQuizForAdmin,
    deleteQuiz, putUpdateQuiz,
    postCreateNewQuestion,
    postCreateNewAnswer,
    postAssignQuiz, getQuizWithQA,
    postUpsertQA, Logout,
    getOverview, refreshToken,
    changePassword, getHistory,
    updateProfile
};