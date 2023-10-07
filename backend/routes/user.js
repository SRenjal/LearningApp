import express from "express";
import { Course } from "../models/courses.js";
import { isValidObjectId } from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newCourse = {
      courseName: req.body.courseName,
      courseDept: req.body.courseDept,
      description: req.body.description,
      duration: req.body.duration,
      isRated: req.body.isRated,
      isApplied: req.body.isApplied,
      noOfRatings: req.body.noOfRatings,
      rating: req.body.rating,
    };

    const course = await Course.create(newCourse);
    return res.status(201).send(course);
  } catch (e) {
    console.log(e);
  }
});

router.get("/get", async (req, res) => {
  try {
    const data = await Course.find();
    res.status(200).json(data);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post("/enroll/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!isValidObjectId(id)) {
      res.status(400).json({ error: " Invalid ID" });
      return;
    }
    const data = await Course.findById(id);
    if (!data) {
      res.status(404).json({ error: "Course with given ID not found" });
      return;
    }
    if (data.isApplied) {
      res
        .status(403)
        .json({ error: "You have already applied for this course" });
      return;
    }
    data.isApplied = true;
    await data.save();

    res
      .status(200)
      .json({ message: "You have successfully enrolled for the course" });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/drop/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (!isValidObjectId(id)) {
      res.status(400).json({ error: " Invalid ID" });
      return;
    }
    const data = await Course.findById(id);
    if (!data) {
      res.status(404).json({ error: "Course with given ID not found" });
      return;
    }
    if (!data.isApplied) {
      res.status(403).json({ error: "You have not enrolled for this course" });
      return;
    }
    data.isApplied = false;
    await data.save();

    res.status(200).json({ message: "You have dropped the course" });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.patch("/rating/:id", async (req, res) => {
  const id = req.params.id;
  const { rating } = req.body;
  try {
    if (!isValidObjectId(id)) {
      res.status(400).json({ error: " Invalid ID" });
      return;
    }
    const data = await Course.findById(id);
    if (!data) {
      res.status(404).json({ error: "Course with given ID not found" });
      return;
    }
    if (data.isRated) {
      res.status(403).json({ error: "You have not enrolled for this course" });
      return;
    }
    if (!data.isApplied) {
      res.status(403).json({ error: "You have already rated this course" });
      return;
    }

    const noOfRatings = data.noOfRatings + 1;
    const newRating = (data.rating * data.noOfRatings + rating) / noOfRatings;

    data.noOfRatings = noOfRatings;
    data.rating = newRating.toFixed(1);

    data.isRated = true;
    await data.save();

    res.status(200).json({ message: "You have rated this course" });
  } catch (e) {
    res.status(400).json(e);
  }
});

export default router;
