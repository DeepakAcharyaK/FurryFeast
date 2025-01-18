  const [veterinary, setVeterinary] = useState(null);


// Fetch veterinary details
        const vetResponse = await axios.get(`http://localhost:3000/user/veterinary/${id}`);
        setVeterinary(vetResponse.data);


{/* Veterinary Information */}
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Veterinary Information
            </Typography>
            {veterinary && veterinary.length > 0 ? (
              veterinary.map((vet, index) => (
                <div key={index} style={{ marginBottom: "1rem" }}>
      <Typography variant="body1">
        <strong>Veterinarian:</strong> {vet.name}
      </Typography>
      <Typography variant="body1">
        <strong>Contact:</strong> {vet.contact}
      </Typography>
      <Typography variant="body1">
        <strong>Email:</strong> {vet.email}
      </Typography>
      <Typography variant="body1">
        <strong>Clinic Name:</strong> {vet.clinicName}
      </Typography>
      <Typography variant="body1">
        <strong>Clinic Address:</strong> {vet.clinicAddress}
      </Typography>
      <Typography variant="body1">
        <strong>Specializations:</strong> {vet.specialization.join(", ")}
      </Typography>
      <Typography variant="body1">
        <strong>Availability:</strong> {vet.availability}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {vet.location}
      </Typography>
      <Typography variant="body1">
        <strong>Experience:</strong> {vet.experience} years
      </Typography>
      <Typography variant="body1">
        <strong>Ratings:</strong> {vet.ratings} / 5
      </Typography>
      <Typography variant="body1">
        <strong>Reviews:</strong>``
        <ul>
          {vet.reviews.map((review, reviewIndex) => (
            <li key={reviewIndex}>{review.comment}</li>
          ))}
        </ul>
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Last Updated: {new Date(vet.updatedAt).toLocaleDateString()}
      </Typography>
    </div>
              ))
            ) : (
              <Typography variant="body2" color="text.secondary">
                No veterinary details available.
              </Typography>
            )}
