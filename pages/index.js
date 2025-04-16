import { useState } from "react";


export default function Home() {
  const [job, setJob] = useState({
    name: "",
    time: "",
    timeZone: "Asia/Kolkata",
    type: "one-time",
    frequency: "none",
    days: [],
    dates: [],
    delay: 0,
    kafkaTopic: "",
    kafkaPayload: ""
  });

  const timeZones = ["UTC", "Asia/Kolkata", "America/New_York", "Europe/London"];
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(job)
      });

      // Create a message with job details
      const jobDetails = `
        Job Name: ${job.name}
        Time: ${job.time}
        Time Zone: ${job.timeZone}
        Type: ${job.type}
        Frequency: ${job.frequency}
        Days: ${job.days.join(", ")}
        Dates: ${job.dates.join(", ")}
        Delay: ${job.delay} minutes
        Kafka Topic: ${job.kafkaTopic}
        Kafka Payload: ${job.kafkaPayload}
      `;

      alert(`Job scheduled successfully! \n\n${jobDetails}`);
    } catch (err) {
      alert("Failed to schedule job");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <div className="card shadow-lg p-4 bg-light">
            <h1 className="text-center text-primary mb-4">Job Scheduler</h1>

            <div className="mb-3">
              <label className="form-label">Job Name  </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter job name"
                value={job.name}
                onChange={e => setJob({ ...job, name: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Time Zone  </label>
              <select
                className="form-select"
                value={job.timeZone}
                onChange={e => setJob({ ...job, timeZone: e.target.value })}
              >
                {timeZones.map(zone => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Time  </label>
              <input
                type="time"
                className="form-control"
                value={job.time}
                onChange={e => setJob({ ...job, time: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Job Type  </label>
              <select
                className="form-select"
                value={job.type}
                onChange={e => setJob({ ...job, type: e.target.value })}
              >
                <option value="one-time">One-Time</option>
                <option value="immediate">Immediate</option>
                <option value="delayed">Delayed Message</option>
                <option value="recurring">Recurring</option>
              </select>
            </div>

            {job.type === "recurring" && (
              <div>
                <label className="form-label">Frequency  </label>
                <select
                  className="form-select"
                  value={job.frequency}
                  onChange={e => setJob({ ...job, frequency: e.target.value })}
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>

                {job.frequency === "weekly" && (
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {daysOfWeek.map(day => (
                      <div key={day} className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={job.days.includes(day)}
                          onChange={() => {
                            const days = job.days.includes(day)
                              ? job.days.filter(d => d !== day)
                              : [...job.days, day];
                            setJob({ ...job, days });
                          }}
                        />
                        <label className="form-check-label">{day}</label>
                      </div>
                    ))}
                  </div>
                )}

                {job.frequency === "monthly" && (
                  <div>
                    <input
                      type="text"
                      className="form-control mt-3"
                      placeholder="Enter dates like 1,15,30"
                      value={job.dates.join(",")}
                      onChange={e => setJob({ ...job, dates: e.target.value.split(",") })}
                    />
                  </div>
                )}
              </div>
            )}

            {job.type === "delayed" && (
              <div>
                <label className="form-label">Delay (Minutes)  </label>
                <input
                  type="number"
                  className="form-control"
                  value={job.delay}
                  onChange={e => setJob({ ...job, delay: Number(e.target.value) })}
                />
              </div>
            )}

            {(job.type === "delayed") && (
              <>
                <div className="mb-3">
                  <label className="form-label">Kafka Topic  </label>
                  <input
                    className="form-control"
                    value={job.kafkaTopic}
                    onChange={e => setJob({ ...job, kafkaTopic: e.target.value })}
                    placeholder="Enter Kafka topic"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Kafka Payload  </label>
                  <textarea
                    className="form-control"
                    value={job.kafkaPayload}
                    onChange={e => setJob({ ...job, kafkaPayload: e.target.value })}
                    placeholder="Enter Kafka payload (JSON format)"
                    rows={4}
                  />
                </div>
              </>
            )}

            <div className="text-center">
              <button
                className="btn btn-primary w-100 py-3"
                onClick={handleSubmit}
              >
                Schedule Job  
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
