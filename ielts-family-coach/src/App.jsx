import { useState } from "react";

const mockStudent = {
  name: "Назерке",
  avatar: "Н",
  streak: 7,
  xp: 1340,
  xpToNext: 1500,
  band: 5.5,
  targetBand: 7.0,
  weeklyGoal: 5,
  weeklyDone: 4,
  totalMinutes: 620,
  badges: [
    { id: 1, name: "Серия 3 дня", icon: "🔥", earned: true },
    { id: 2, name: "Серия 7 дней", icon: "⚡", earned: true },
    { id: 3, name: "Герой слов", icon: "📚", earned: false },
    { id: 4, name: "Смелый оратор", icon: "🎙️", earned: false },
    { id: 5, name: "Звезда пересказа", icon: "✍️", earned: true },
  ],
  todayDone: false,
  recentWords: ["melancholy", "persevere", "eloquent", "ambiguous", "prevalent"],
};

const mockParent = {
  childName: "Назерке",
  todayCompleted: false,
  weeklyStreak: 7,
  totalMinutes: 620,
  writingBand: 5.5,
  speakingBand: 5.0,
  vocabLearned: 87,
  recentContent: [
    { title: "Очень странные дела", ep: "S1E2", date: "Сегодня", platform: "Netflix" },
    { title: "TED Talk: Сила привычки", ep: "—", date: "Вчера", platform: "YouTube" },
    { title: "Корона", ep: "S3E1", date: "3 дня назад", platform: "Netflix" },
  ],
  weakAreas: ["Связность текста", "Лексический диапазон", "Произношение"],
  writingHistory: [4.5, 5.0, 5.0, 5.5, 5.5, 5.5],
  speakingHistory: [4.0, 4.5, 4.5, 5.0, 5.0, 5.0],
  aiSummary:
    "Назерке демонстрирует стабильный прогресс. Она поддерживает серию из 7 дней и пишет пересказы с улучшающимся разнообразием предложений. Основная зона роста — глубина словарного запаса: она склонна повторять распространённые слова. Уверенность в говорении растёт, ответы становятся длиннее. Рекомендую на следующей неделе сосредоточиться на структуре эссе IELTS Task 2.",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'DM Sans',sans-serif;background:#F0F2FF;min-height:100vh;color:#1F2937}
  .app{min-height:100vh}
  .nav{background:#fff;border-bottom:1px solid #E5E7EB;padding:0 1.5rem;display:flex;align-items:center;justify-content:space-between;height:56px;position:sticky;top:0;z-index:100}
  .nav-brand{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:17px;color:#6C63FF;letter-spacing:-0.5px}
  .nav-brand span{color:#FF6B9D}
  .nav-tabs{display:flex;gap:4px}
  .nav-tab{padding:6px 14px;border-radius:20px;font-size:13px;font-weight:500;cursor:pointer;border:none;background:transparent;color:#6B7280;transition:all 0.2s;font-family:'DM Sans',sans-serif}
  .nav-tab.active{background:#6C63FF;color:#fff}
  .nav-tab:hover:not(.active){background:#F3F4F6;color:#374151}
  .nav-user{display:flex;align-items:center;gap:8px;font-size:13px;color:#6B7280}
  .avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#6C63FF,#FF6B9D);color:white;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px}
  .subnav{background:#fff;border-bottom:1px solid #E5E7EB;padding:0 1.5rem;display:flex;gap:4px}
  .subnav-btn{padding:9px 14px;border:none;background:transparent;cursor:pointer;font-size:13px;font-weight:500;transition:all 0.2s;font-family:'DM Sans',sans-serif;border-bottom:2px solid transparent;color:#6B7280}
  .subnav-btn.active{color:#6C63FF;border-bottom-color:#6C63FF}
  .main{padding:1.5rem;max-width:1100px;margin:0 auto}
  .card{background:#fff;border-radius:16px;border:1px solid #E5E7EB;padding:1rem 1.25rem}
  .grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:0.75rem;margin-bottom:0.75rem}
  .grid2{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin-bottom:0.75rem}
  .h1{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;font-size:22px;letter-spacing:-0.5px}
  .h2{font-family:'Plus Jakarta Sans',sans-serif;font-weight:700;font-size:16px}
  .h3{font-weight:600;font-size:14px}
  .lbl{font-size:11px;font-weight:500;color:#9CA3AF;letter-spacing:0.5px;text-transform:uppercase}
  .muted{color:#6B7280;font-size:13px}
  .bignum{font-family:'Plus Jakarta Sans',sans-serif;font-size:26px;font-weight:800;letter-spacing:-1px}
  .prog-track{height:7px;background:#F3F4F6;border-radius:99px;overflow:hidden}
  .prog-fill{height:100%;border-radius:99px;transition:width 0.6s}
  .bp{display:inline-flex;align-items:center;padding:3px 9px;border-radius:99px;font-size:11px;font-weight:600}
  .bp-purple{background:#EEF0FF;color:#6C63FF}
  .bp-pink{background:#FFF0F6;color:#FF6B9D}
  .bp-teal{background:#E6FAFA;color:#0FBCAD}
  .bp-amber{background:#FFFBEB;color:#D97706}
  .bp-green{background:#ECFDF5;color:#059669}
  .bp-gray{background:#F3F4F6;color:#9CA3AF}
  .mission-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid #F3F4F6}
  .mission-item:last-child{border-bottom:none}
  .mcheck{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;font-size:11px}
  .mcheck-done{background:#10B981;color:white}
  .mcheck-todo{background:#F3F4F6;border:2px dashed #D1D5DB}
  .btn{display:inline-flex;align-items:center;gap:6px;padding:9px 18px;border-radius:10px;font-weight:600;font-size:13px;cursor:pointer;border:none;transition:all 0.2s;font-family:'DM Sans',sans-serif}
  .btn-primary{background:linear-gradient(135deg,#6C63FF,#9F8EFF);color:white}
  .btn-primary:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(108,99,255,0.3)}
  .btn-pink{background:linear-gradient(135deg,#FF6B9D,#FF9CC0);color:white}
  .btn-pink:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(255,107,157,0.3)}
  .btn-outline{background:white;color:#6C63FF;border:1.5px solid #6C63FF}
  .btn-outline:hover{background:#EEF0FF}
  .btn-sm{padding:6px 13px;font-size:12px}
  .field{width:100%;border:1.5px solid #E5E7EB;border-radius:10px;padding:8px 11px;font-family:'DM Sans',sans-serif;font-size:13px;color:#1F2937;background:#FAFAFA;resize:vertical}
  .field:focus{outline:none;border-color:#6C63FF;background:white}
  .ai-block{background:linear-gradient(135deg,#EEF0FF 0%,#FFF0F6 100%);border:1px solid #D4D0FF;border-radius:14px;padding:1rem}
  .wt{width:100%;border-collapse:collapse}
  .wt th{font-size:10px;font-weight:600;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.5px;text-align:left;padding:7px 9px;background:#F9FAFB;border-bottom:1px solid #E5E7EB}
  .wt td{padding:8px 9px;font-size:13px;border-bottom:1px solid #F3F4F6}
  .band-meter{position:relative;height:11px;background:linear-gradient(90deg,#EF4444,#F59E0B,#10B981,#6C63FF);border-radius:99px}
  .band-needle{position:absolute;top:-4px;width:18px;height:18px;background:white;border:3px solid #6C63FF;border-radius:50%;transform:translateX(-50%)}
  .mini-graph{display:flex;align-items:flex-end;gap:3px;height:44px}
  .mini-bar{flex:1;border-radius:3px 3px 0 0;min-height:3px}
  .divider{height:1px;background:#F3F4F6;margin:1rem 0}
  .stat-val{font-family:'Plus Jakarta Sans',sans-serif;font-size:28px;font-weight:800;letter-spacing:-1px}
  @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
  .fade-in{animation:fadeIn 0.35s ease forwards}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
  .pulse{animation:pulse 2s ease infinite}
  select.field{height:38px}
  @media(max-width:700px){.grid4{grid-template-columns:repeat(2,1fr)}.grid2{grid-template-columns:1fr}.main{padding:1rem}}
`;

function ProgressBar({ value, max, color = "#6C63FF", height = 7 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="prog-track" style={{ height }}>
      <div className="prog-fill" style={{ width: `${pct}%`, background: color, height }} />
    </div>
  );
}

function BandMeter({ current }) {
  const pct = ((current - 4) / (9 - 4)) * 100;
  return (
    <div>
      <div className="band-meter">
        <div className="band-needle" style={{ left: `${pct}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
        {[4, 5, 6, 7, 8, 9].map((b) => (
          <span key={b} style={{ fontSize: 10, fontWeight: b === 7 ? 700 : 400, color: b === 7 ? "#6C63FF" : "#9CA3AF" }}>{b}.0</span>
        ))}
      </div>
    </div>
  );
}

function MiniGraph({ data, color = "#6C63FF" }) {
  const max = Math.max(...data);
  return (
    <div className="mini-graph">
      {data.map((v, i) => (
        <div key={i} className="mini-bar" style={{ height: `${(v / max) * 100}%`, background: `linear-gradient(180deg,${color},${color}88)` }} />
      ))}
    </div>
  );
}

function StudentDashboard({ onGoToTask }) {
  const s = mockStudent;
  const xpPct = Math.round((s.xp / s.xpToNext) * 100);
  return (
    <div className="main fade-in">
      <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div className="lbl" style={{ marginBottom: 4 }}>Доброе утро ✨</div>
          <div className="h1">Привет, {s.name}! Готова прокачаться? 🚀</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div className="lbl">Текущий балл</div>
          <div style={{ fontSize: 30, fontWeight: 800, color: "#6C63FF", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{s.band}</div>
        </div>
      </div>

      <div className="grid4">
        {[
          { lbl: "🔥 Серия", val: s.streak, sub: "дней подряд!", color: "#FF6B9D" },
          { lbl: "⚡ Очки XP", val: "1 340", sub: `ещё ${s.xpToNext - s.xp} до уровня`, color: "#6C63FF" },
          { lbl: "📅 Цель недели", val: `${s.weeklyDone}/${s.weeklyGoal}`, sub: "дней выполнено", color: "#0FBCAD" },
          { lbl: "🕒 Всего времени", val: s.totalMinutes, sub: "минут занятий", color: "#F59E0B" },
        ].map((c, i) => (
          <div className="card" key={i}>
            <div className="lbl" style={{ marginBottom: 5 }}>{c.lbl}</div>
            <div className="bignum" style={{ color: c.color }}>{c.val}</div>
            <div className="muted" style={{ fontSize: 11 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
            <div className="h2">Задание на сегодня</div>
            <span className="bp bp-pink">День {s.streak}</span>
          </div>
          {[
            { icon: "🎬", label: "Смотри 20 мин на английском", sub: "Netflix, YouTube, Language Reactor…", done: true },
            { icon: "📝", label: "Добавь 10 новых слов", sub: "Со значением и примером предложения", done: true },
            { icon: "✍️", label: "Напиши пересказ 100–150 слов", sub: "Что произошло в серии?", done: false },
            { icon: "🎙️", label: "Ответь на вопрос IELTS Speaking", sub: "Напечатай или запиши свой ответ", done: false },
          ].map((m, i) => (
            <div className="mission-item" key={i}>
              <div className={`mcheck ${m.done ? "mcheck-done" : "mcheck-todo"}`}>{m.done ? "✓" : ""}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13, textDecoration: m.done ? "line-through" : "none", color: m.done ? "#9CA3AF" : "#1F2937" }}>
                  {m.icon} {m.label}
                </div>
                <div className="muted" style={{ fontSize: 11, marginTop: 2 }}>{m.sub}</div>
              </div>
              {m.done && <span className="bp bp-green" style={{ fontSize: 10 }}>+50 XP</span>}
            </div>
          ))}
          <div style={{ marginTop: "0.75rem" }}>
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={onGoToTask}>Открыть задание дня ✨</button>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <div className="h3">Прогресс XP</div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#6C63FF" }}>{xpPct}%</span>
            </div>
            <ProgressBar value={s.xp} max={s.xpToNext} color="linear-gradient(90deg,#6C63FF,#FF6B9D)" />
            <div className="muted" style={{ fontSize: 11, marginTop: 3 }}>{s.xp} / {s.xpToNext} XP — Уровень 6</div>
          </div>
          <div className="card">
            <div className="h3" style={{ marginBottom: 8 }}>Прогресс балла</div>
            <BandMeter current={s.band} />
            <div style={{ marginTop: 6, fontSize: 11, color: "#6B7280" }}>До цели осталось 1.5 балла 🎯</div>
          </div>
          <div className="card">
            <div className="h3" style={{ marginBottom: 8 }}>Эта неделя</div>
            <div style={{ display: "flex", gap: 5 }}>
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ height: 5, borderRadius: 99, background: i < s.weeklyDone ? "linear-gradient(90deg,#6C63FF,#FF6B9D)" : "#E5E7EB", marginBottom: 3 }} />
                  <div style={{ fontSize: 9, color: "#9CA3AF" }}>{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid2">
        <div className="card">
          <div className="h2" style={{ marginBottom: "0.75rem" }}>🏆 Твои достижения</div>
          {s.badges.map((b) => (
            <div key={b.id} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 10px", borderRadius: 10, background: b.earned ? "#EEF0FF" : "#F9FAFB", border: `1px solid ${b.earned ? "#D4D0FF" : "#E5E7EB"}`, opacity: b.earned ? 1 : 0.5, marginBottom: 6 }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <span style={{ fontWeight: 600, fontSize: 13, color: b.earned ? "#6C63FF" : "#9CA3AF" }}>{b.name}</span>
              <span className={`bp ${b.earned ? "bp-green" : "bp-gray"}`} style={{ marginLeft: "auto", fontSize: 10 }}>{b.earned ? "Получено!" : "Заблокировано"}</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
            <div className="h2">📚 Последние слова</div>
            <span className="bp bp-teal">+87 всего</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: "0.75rem" }}>
            {s.recentWords.map((w) => <span key={w} className="bp bp-purple" style={{ fontSize: 12 }}>{w}</span>)}
          </div>
          <div className="divider" />
          <div className="lbl" style={{ marginBottom: 7 }}>Вопрос IELTS Speaking на сегодня</div>
          <div style={{ background: "linear-gradient(135deg,#EEF0FF,#FFF0F6)", border: "1px solid #D4D0FF", borderRadius: 10, padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "#4B3F9F", lineHeight: 1.5 }}>
            🗣️ "Describe a time when you had to make an important decision."
          </div>
          <button className="btn btn-outline btn-sm" style={{ marginTop: 8, width: "100%" }} onClick={onGoToTask}>Ответить на вопрос →</button>
        </div>
      </div>
    </div>
  );
}

function StudentTaskPage() {
  const [words, setWords] = useState([
    { word: "melancholy", meaning: "чувство грусти", example: "She felt melancholy after the film ended." },
    { word: "persevere", meaning: "продолжать несмотря на трудности", example: "She persevered through every challenge." },
    { word: "", meaning: "", example: "" },
  ]);
  const [summary, setSummary] = useState("");
  const [speaking, setSpeaking] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [contentTitle, setContentTitle] = useState("Очень странные дела");
  const [episode, setEpisode] = useState("S1E3");
  const [platform, setPlatform] = useState("Netflix");

  const handleAICheck = () => {
    setLoading(true);
    setTimeout(() => {
      setFeedback({
        grammar: [
          { original: "She have watched the episode carefully.", corrected: "She has watched the episode carefully." },
          { original: "The character is very brave and she help her friend.", corrected: "The character is very brave and she helps her friend." },
        ],
        vocabulary: [
          { original: "good", better: "outstanding / remarkable" },
          { original: "bad", better: "devastating / catastrophic" },
          { original: "said", better: "exclaimed / revealed / insisted" },
        ],
        writingBand: "5.5",
        speakingFeedback: "Хорошая попытка! Твой ответ понятен и по теме. Старайся добавлять больше деталей — объясняй ПОЧЕМУ ты приняла такое решение. Используй: 'furthermore', 'as a result', 'looking back'.",
        nextRecommendation: "Завтра посмотри 4-ю серию. Постарайся использовать 3 новых слова в завтрашнем пересказе.",
      });
      setLoading(false);
    }, 2000);
  };

  const updateWord = (i, field, val) => {
    const next = [...words];
    next[i] = { ...next[i], [field]: val };
    if (i === words.length - 1 && val && words.length < 10) next.push({ word: "", meaning: "", example: "" });
    setWords(next);
  };

  const wordCount = summary.split(" ").filter(Boolean).length;

  return (
    <div className="main fade-in">
      <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: 10 }}>
        <div>
          <div className="lbl" style={{ marginBottom: 4 }}>Задание дня</div>
          <div className="h1">Выполни ежедневное задание 📖</div>
        </div>
        <span className="bp bp-purple" style={{ marginLeft: "auto" }}>+200 XP за выполнение</span>
      </div>

      <div className="card" style={{ marginBottom: "0.75rem" }}>
        <div className="h2" style={{ marginBottom: "0.75rem" }}>🎬 Что ты смотрела сегодня?</div>
        <div style={{ background: "#F0F2FF", borderRadius: 9, padding: "9px 12px", fontSize: 12, color: "#6B7280", marginBottom: "0.75rem" }}>
          💡 Ты можешь смотреть через <strong>Netflix</strong>, <strong>YouTube</strong>, <strong>Language Reactor</strong> или любой другой английский контент.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 8 }}>
          <div>
            <div className="lbl" style={{ marginBottom: 3 }}>Название фильма / сериала</div>
            <input className="field" value={contentTitle} onChange={e => setContentTitle(e.target.value)} style={{ height: 36 }} />
          </div>
          <div>
            <div className="lbl" style={{ marginBottom: 3 }}>Эпизод</div>
            <input className="field" value={episode} onChange={e => setEpisode(e.target.value)} style={{ height: 36 }} />
          </div>
          <div>
            <div className="lbl" style={{ marginBottom: 3 }}>Платформа</div>
            <select className="field" value={platform} onChange={e => setPlatform(e.target.value)}>
              <option>Netflix</option><option>YouTube</option><option>Language Reactor</option><option>Apple TV</option><option>Другое</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
          <div className="h2">📚 Новые слова (цель: 10 слов)</div>
          <span className="bp bp-teal">{words.filter(w => w.word).length} / 10</span>
        </div>
        <table className="wt">
          <thead><tr><th style={{ width: "25%" }}># Слово</th><th style={{ width: "35%" }}>Значение</th><th>Пример предложения</th></tr></thead>
          <tbody>
            {words.map((w, i) => (
              <tr key={i}>
                <td><span style={{ color: "#9CA3AF", fontWeight: 700, fontSize: 11, marginRight: 6 }}>{i + 1}</span>
                  <input className="field" value={w.word} onChange={e => updateWord(i, "word", e.target.value)} placeholder="новое слово…" style={{ border: "none", background: "transparent", padding: "2px 0", fontWeight: 600, fontSize: 13 }} /></td>
                <td><input className="field" value={w.meaning} onChange={e => updateWord(i, "meaning", e.target.value)} placeholder="значение…" style={{ border: "none", background: "transparent", padding: "2px 0", fontSize: 13 }} /></td>
                <td><input className="field" value={w.example} onChange={e => updateWord(i, "example", e.target.value)} placeholder="используй в предложении…" style={{ border: "none", background: "transparent", padding: "2px 0", fontSize: 13 }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
          <div className="h2">✍️ Пересказ серии</div>
          <span style={{ fontSize: 11, color: wordCount >= 100 ? "#10B981" : "#F59E0B", fontWeight: 600 }}>{wordCount} слов / цель 100–150</span>
        </div>
        <textarea className="field" rows={5} value={summary} onChange={e => setSummary(e.target.value)} placeholder="В этой серии главные герои обнаруживают таинственный тоннель под городом…" />
        <div style={{ marginTop: 5 }}>
          <ProgressBar value={Math.min(wordCount, 150)} max={150} color={wordCount >= 100 ? "#10B981" : "#F59E0B"} />
        </div>
      </div>

      <div className="card" style={{ marginBottom: "0.75rem" }}>
        <div className="h2" style={{ marginBottom: 7 }}>🎙️ Ответ на вопрос Speaking</div>
        <div style={{ background: "linear-gradient(135deg,#EEF0FF,#FFF0F6)", border: "1px solid #D4D0FF", borderRadius: 9, padding: "10px 12px", fontSize: 13, fontWeight: 500, color: "#4B3F9F", marginBottom: 10, lineHeight: 1.5 }}>
          🗣️ "Describe a time when you had to make an important decision. What was it, and how did you make it?"
        </div>
        <textarea className="field" rows={4} value={speaking} onChange={e => setSpeaking(e.target.value)} placeholder="Когда мне было 11 лет, мне нужно было решить, менять ли школу…" />
        <div className="muted" style={{ fontSize: 11, marginTop: 5 }}>Стремись к ответу на 2–3 минуты. Структура: ситуация → действие → результат → вывод.</div>
      </div>

      <div style={{ textAlign: "center", marginBottom: "1.25rem" }}>
        <button className="btn btn-pink pulse" style={{ fontSize: 14, padding: "12px 36px" }} onClick={handleAICheck} disabled={loading}>
          {loading ? "🤖 ИИ проверяет твою работу…" : "✨ Проверить с помощью ИИ"}
        </button>
        <div className="muted" style={{ fontSize: 11, marginTop: 6 }}>ИИ проверит грамматику, словарный запас и оценит твой балл IELTS.</div>
      </div>

      {feedback && (
        <div className="ai-block fade-in" style={{ marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "0.75rem" }}>
            <span style={{ fontSize: 22 }}>🤖</span>
            <div><div className="h2">Обратная связь от ИИ</div><div className="muted" style={{ fontSize: 11 }}>Вот что думает твой ИИ-тренер</div></div>
            <span className="bp bp-green" style={{ marginLeft: "auto", fontSize: 12 }}>Writing Band: {feedback.writingBand}</span>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "#6C63FF", marginBottom: 8 }}>📝 Исправление грамматики</div>
            {feedback.grammar.map((g, i) => (
              <div key={i} style={{ marginBottom: 6, padding: "8px 11px", background: "white", borderRadius: 8, border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: 12, color: "#EF4444", textDecoration: "line-through" }}>{g.original}</div>
                <div style={{ fontSize: 12, color: "#10B981", fontWeight: 500, marginTop: 2 }}>✓ {g.corrected}</div>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "#FF6B9D", marginBottom: 8 }}>💎 Лучший словарный запас</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {feedback.vocabulary.map((v, i) => (
                <div key={i} style={{ background: "white", borderRadius: 8, padding: "5px 10px", border: "1px solid #E5E7EB", fontSize: 12 }}>
                  <span style={{ textDecoration: "line-through", color: "#9CA3AF" }}>{v.original}</span>
                  <span style={{ color: "#6C63FF", fontWeight: 600 }}> → {v.better}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "#0FBCAD", marginBottom: 8 }}>🎙️ Обратная связь по Speaking</div>
            <div style={{ background: "white", borderRadius: 8, padding: "9px 12px", fontSize: 12, border: "1px solid #E5E7EB", lineHeight: 1.6 }}>{feedback.speakingFeedback}</div>
          </div>
          <div style={{ marginBottom: "0.75rem" }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: 14, color: "#F59E0B", marginBottom: 8 }}>🔮 Следующая рекомендация</div>
            <div style={{ background: "white", borderRadius: 8, padding: "9px 12px", fontSize: 12, border: "1px solid #E5E7EB", lineHeight: 1.6 }}>{feedback.nextRecommendation}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm">✓ Отметить выполненным (+200 XP)</button>
            <button className="btn btn-outline btn-sm">Сохранить позже</button>
          </div>
        </div>
      )}
    </div>
  );
}

function ParentDashboard() {
  const p = mockParent;
  return (
    <div className="main fade-in">
      <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div className="lbl" style={{ marginBottom: 4 }}>Вид родителя</div>
          <div className="h1">Отчёт о прогрессе {p.childName}</div>
          <div className="muted" style={{ marginTop: 4 }}>Обновлено сегодня в 14:32 · Неделя 12 подготовки к IELTS</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "10px 16px" }}>
          <span style={{ fontSize: 24 }}>⏳</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E" }}>Задание сегодня</div>
            <div style={{ fontSize: 12, color: "#B45309" }}>Ещё не выполнено</div>
          </div>
        </div>
      </div>

      <div className="grid4">
        {[
          { lbl: "Серия за неделю", val: p.weeklyStreak, sub: "дней", color: "#FF6B9D" },
          { lbl: "Время занятий", val: p.totalMinutes, sub: "минут всего", color: "#6C63FF" },
          { lbl: "Изучено слов", val: p.vocabLearned, sub: "единиц словаря", color: "#0FBCAD" },
          { lbl: "Целевой балл", val: "7.0", sub: `текущий: ${p.writingBand}`, color: "#F59E0B" },
        ].map((c, i) => (
          <div className="card" key={i}>
            <div className="lbl" style={{ marginBottom: 6 }}>{c.lbl}</div>
            <div className="stat-val" style={{ color: c.color }}>{c.val}</div>
            <div className="muted" style={{ fontSize: 11 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <div className="card">
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.75rem" }}>
            <span style={{ fontSize: 18 }}>🤖</span>
            <div className="h2">Резюме ИИ-тренера</div>
          </div>
          <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.7 }}>{p.aiSummary}</div>
          <div className="divider" />
          <div className="lbl" style={{ marginBottom: 6 }}>Прогресс балла к 7.0</div>
          <BandMeter current={p.writingBand} />
          <div style={{ marginTop: 6, display: "flex", justifyContent: "space-between" }}>
            <span className="muted" style={{ fontSize: 11 }}>Сейчас: {p.writingBand}</span>
            <span className="muted" style={{ fontSize: 11 }}>Цель: 7.0</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div className="card">
            <div className="h2" style={{ marginBottom: "0.75rem" }}>⚠️ Зоны для улучшения</div>
            {p.weakAreas.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: "1px solid #F3F4F6" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: ["#EF4444", "#F59E0B", "#6C63FF"][i], flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#374151" }}>{a}</span>
                <span className={`bp ${["bp-pink", "bp-amber", "bp-purple"][i]}`} style={{ marginLeft: "auto", fontSize: 10 }}>{["Высокий", "Средний", "Низкий"][i]}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="h2" style={{ marginBottom: "0.75rem" }}>📅 Эта неделя</div>
            <div style={{ display: "flex", gap: 5 }}>
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d, i) => (
                <div key={i} style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ height: 24, borderRadius: 5, background: i < 4 ? "linear-gradient(135deg,#6C63FF,#FF6B9D)" : "#F3F4F6", marginBottom: 3 }} />
                  <span style={{ fontSize: 9, color: "#9CA3AF" }}>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid2">
        {[
          { title: "✍️ История Writing", band: p.writingBand, data: p.writingHistory, color: "#6C63FF", cls: "bp-purple", bars: [{ lbl: "Выполнение задачи", val: 5.5, color: "#6C63FF" }, { lbl: "Связность", val: 5, color: "#FF6B9D" }] },
          { title: "🎙️ История Speaking", band: p.speakingBand, data: p.speakingHistory, color: "#0FBCAD", cls: "bp-teal", bars: [{ lbl: "Беглость", val: 5, color: "#0FBCAD" }, { lbl: "Словарный запас", val: 4.5, color: "#F59E0B" }] },
        ].map((s, si) => (
          <div className="card" key={si}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <div className="h2">{s.title}</div>
              <span className={`bp ${s.cls}`}>Балл {s.band}</span>
            </div>
            <MiniGraph data={s.data} color={s.color} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              {s.data.map((v, i) => (
                <div key={i} style={{ textAlign: "center", flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: "#374151" }}>{v}</div>
                  <div style={{ fontSize: 9, color: "#9CA3AF" }}>Н{i + 1}</div>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div style={{ display: "flex", gap: 10 }}>
              {s.bars.map((b, i) => (
                <div key={i} style={{ flex: 1 }}>
                  <div className="lbl" style={{ marginBottom: 3 }}>{b.lbl}</div>
                  <ProgressBar value={b.val} max={9} color={b.color} />
                  <div style={{ fontSize: 10, color: "#6B7280", marginTop: 2 }}>{b.val} / 9.0</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="h2" style={{ marginBottom: "0.75rem" }}>🎬 Просмотренный контент</div>
        <table className="wt">
          <thead><tr><th>Название</th><th>Эпизод</th><th>Платформа</th><th>Дата</th></tr></thead>
          <tbody>
            {p.recentContent.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600 }}>{c.title}</td>
                <td style={{ color: "#6B7280" }}>{c.ep}</td>
                <td><span className="bp bp-purple" style={{ fontSize: 11 }}>{c.platform}</span></td>
                <td style={{ color: "#6B7280", fontSize: 12 }}>{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState("student");
  const [page, setPage] = useState("dashboard");
  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-brand">IELTS <span>Family</span> Coach</div>
          <div className="nav-tabs">
            <button className={`nav-tab ${role === "student" ? "active" : ""}`} onClick={() => { setRole("student"); setPage("dashboard"); }}>👩‍🎓 Ученик</button>
            <button className={`nav-tab ${role === "parent" ? "active" : ""}`} onClick={() => { setRole("parent"); setPage("dashboard"); }}>👨‍👩‍👧 Родитель</button>
          </div>
          <div className="nav-user">
            {role === "student" ? (
              <><span style={{ fontSize: 12 }}>🔥 Серия 7 дней</span><div className="avatar">Н</div><span style={{ fontSize: 13, fontWeight: 500 }}>Назерке</span></>
            ) : (
              <><div className="avatar" style={{ background: "linear-gradient(135deg,#374151,#6B7280)" }}>Р</div><span style={{ fontSize: 13, fontWeight: 500 }}>Вид родителя</span></>
            )}
          </div>
        </nav>
        {role === "student" && (
          <div className="subnav">
            {[{ id: "dashboard", label: "🏠 Главная" }, { id: "task", label: "✍️ Задание дня" }].map((t) => (
              <button key={t.id} className={`subnav-btn ${page === t.id ? "active" : ""}`} onClick={() => setPage(t.id)}>{t.label}</button>
            ))}
          </div>
        )}
        {role === "student" && page === "dashboard" && <StudentDashboard onGoToTask={() => setPage("task")} />}
        {role === "student" && page === "task" && <StudentTaskPage />}
        {role === "parent" && <ParentDashboard />}
      </div>
    </>
  );
}
