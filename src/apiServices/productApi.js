import * as request from '~/until/httpRequest';

export const getProduct = async () => {
    try {
        const res = await request.get('products');
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getCategory = async () => {
    try {
        const res = await request.get('products/categories');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getProductFromCategory = async ({ name }) => {
    try {
        const res = await request.get(`products/category/${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const geDetailProduct = async ({ name }) => {
    try {
        const res = await request.get(`products/${name}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

// export const getProduct = async () => {
//     try {
//         const res = await httpRequest.get('products');
//         return res.data;
//     } catch (error) {
//         console.log(error);
//     }
// };
