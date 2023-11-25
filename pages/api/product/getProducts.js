import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

// const handler = async (req, res) => {
//     if (req.method !== 'GET') {
//         return res.status(405).json({ error: 'Method Not Allowed' });
//     }

//     const {page_no,pageSize,id,title,description,is_plate,is_person,is_veg,is_nonveg,is_bakery,is_food,is_assamese} = req.query;

//     try{
//         const query={};

//         if(title){
//             query.title = title;
//         }
//         if(description){
//             query.description = description;
//         }
//         if(is_plate){
//             query.is_plate = is_plate;
//         }
//         if(is_person){
//             query.is_person = is_person;
//         }
//         if(is_veg){
//             query.is_veg = is_veg;
//         }
//         if(is_nonveg){
//             query.is_nonveg = is_nonveg;
//         }
//         if(is_bakery){
//             query.is_bakery = is_bakery;
//         }
//         if(is_food){
//             query.is_food = is_food;
//         }
//         if(id){
//             // query._id = id;
//             const idArray = id.split(',');
//             query._id = { $in: idArray };
//         }

//         const products = await Product.find(query).skip((page_no - 1) * pageSize).limit(pageSize);
//         res.status(200).json(products);
//     }
//     catch(err){
//         return res.status(500).json({err})
//     }
// }


// export default connectDb(handler);



const handler = async (req, res) => {
    const { method, query } = req;

    switch (method) {
        case 'GET':
            try {
                const filters = {};
                if (query.is_assamese) filters.is_assamese = true;
                if (query.is_food) filters.is_food = true;
                if (query.is_bakery) filters.is_bakery = true;
                if (query.is_veg) filters.is_veg = true;
                if (query.is_nonveg) filters.is_nonveg = true;
                if (query.id) {
                    const idArray = query.id.split(',');
                    filters._id = { $in: idArray };
                }

                if (query.search) {
                    filters.$or = [
                        { title: { $regex: query.search, $options: 'i' } },
                        { description: { $regex: query.search, $options: 'i' } },
                    ];
                }

                const products = await Product.find(filters).skip((query?.page_no - 1) * query?.pageSize).limit(query?.pageSize);

                res.status(200).json({ success: true, data: products });
            } catch (error) {
                res.status(500).json({ success: false, error: error.message });
            }
            break;
        default:
            res.status(405).json({ success: false, message: 'Method Not Allowed' });
            break;
    }
};
export default connectDb(handler);
