app.post("/bookings", authMiddleware, async (req, res) => {
  try {
    const { carName, days, rentPerDay } = req.body;
    const userId = req.user.userId;

    if (days >= 365 || rentPerDay > 2000) {
      return res.status(400).json({
        success: false,
        error: "invalid inputs"
      });
    }

    if (!carName || !days || !rentPerDay) {
      return res.status(400).json({
        success: false,
        error: "All fields are required"
      });
    }

    const totalCost = days * rentPerDay;

    const query = `
      INSERT INTO bookings (user_id, car_name, days, rent_per_day, total_cost, status)
      VALUES ($1, $2, $3, $4, $5, 'booked')
      RETURNING id, total_cost
    `;

    const values = [userId, carName, days, rentPerDay, totalCost];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      data: {
        message: "Booking created successfully",
        bookingId: result.rows[0].id,
        totalCost: result.rows[0].total_cost
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
});
