import Comment from "../models/comment";
import * as express from "express";
import { isLoggedIn } from "./middleware";
import User from "../models/user";

const router = express.Router();

router.post(`/:id`, isLoggedIn, async (req, res, next) => {
  try {
    await Comment.create({
      contentId: req.params.id,
      UserId: req.user!.id,
      content: req.body.content,
    });

    const comments = await Comment.findAll({
      where: {
        contentId: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });

    return res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.get(`/:id`, async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: {
        contentId: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });

    return res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.delete(`/:id/:contentid`, isLoggedIn, async (req, res, next) => {
  try {
    await Comment.destroy({ where: { id: req.params.id } });

    const comments = await Comment.findAll({
      where: {
        contentId: req.params.contentid,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    return res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

router.put("/:id/:contentid", isLoggedIn, async (req, res, next) => {
  try {
    await Comment.update(
      { content: req.body.content },
      { where: { id: req.params.id } }
    );
    const comments = await Comment.findAll({
      where: {
        contentId: req.params.contentid,
      },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
    return res.json(comments);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

export default router;
