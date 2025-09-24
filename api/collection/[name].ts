import type { VercelRequest, VercelResponse } from '@vercel/node';
import clientPromise from '../_mongo';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || 'appdb';
    const db = client.db(dbName);

    const name = (req.query.name as string) || 'items';
    const col = db.collection(name);

    if (req.method === 'POST') {
      const doc = req.body && typeof req.body === 'object' ? req.body : {};
      const r = await col.insertOne({ ...doc, _ts: new Date() });
      return res.status(200).json({ ok: true, insertedId: r.insertedId });
    }

    if (req.method === 'GET') {
      const q = (req.query.q as string) || '';
      const filter = q ? { $text: { $search: q } } : {};
      const items = await col.find(filter).limit(200).toArray();
      return res.status(200).json(items);
    }

    if (req.method === 'DELETE') {
      const id = (req.query.id as string);
      if (!id) return res.status(400).json({ ok: false, error: 'id required' });
      // naive delete by string _id not implemented without ObjectId parsing
      return res.status(501).json({ ok: false, error: 'DELETE by id not implemented in demo' });
    }

    return res.status(405).end();
  } catch (err:any) {
    console.error(err);
    return res.status(500).json({ ok:false, error: err.message || 'Server error' });
  }
}
