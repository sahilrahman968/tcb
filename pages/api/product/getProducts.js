import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

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
