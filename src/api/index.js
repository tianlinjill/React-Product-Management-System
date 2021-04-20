/**
 * this module packaged the application's all interface request function
 */
import ajax from './ajax'


//login 
// export function reqLogin(username,password) {
//     return ajax('/login', {username, password}, 'POST')
//   }
const BASE = ''
export const reqLogin = (username, password) => ajax(BASE +'/login', { username, password }, 'POST');

//add user
export const reqAddUser = (user) => ajax(BASE +'/manage/user/add', user, 'POST');
// get category/children category
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list', { parentId }, 'GET');
//add category
export const reqAddCategory = (parentId, categoryName) => ajax(BASE + '/manage/category/add', { parentId, categoryName }, 'POST');
//update category
export const reqUpdateCategory = ({ categoryId, categoryName }) => ajax(BASE + '/manage/category/update', { categoryId, categoryName }, 'POST');
// get product paged list
export const reqProducts = (pageNum, pageSize) => ajax(BASE + '/manage/product/list', { pageNum, pageSize }, 'GET');
// get data about search contebt(ProductName or ProductDescription)
export const reqSearchProducts = ({ pageNum, pageSize, searchName, searchType}) => ajax(BASE + '/manage/product/search', {
    pageNum,
    pageSize,
    [searchType]:searchName

}, 'GET')
// get category ID
export const reqCategoryId = (categoryId) => ajax(BASE + '/manage/category/info', { categoryId }, 'GET');

// update product's stauts :(delist enroll)
export const reqUpdateStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus', {productId,status}, 'POST')
//get Sydney Weather
export const reqWeather = () => ajax('http://api.openweathermap.org/data/2.5/weather?q=Sydney&appid=8e9dca9c2bf145a564869fdd5c79dccb', 'GET');
