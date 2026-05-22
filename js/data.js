// 默认数据 - 从简历提取
window.DEFAULT_DATA = {
  about_title: '关于我',
  about_lead: '热爱影视、游戏与 AIGC 的视觉创作者，专注于将创意快速转化为高完成度的视频与交互作品。',
  about_portrait: './assets/portrait.jpg',
  contact_phone: '188 3787 7088',
  contact_email: '424573509@qq.com',
  contact_phone2: '188 3787 7088',
  contact_email2: '424573509@qq.com',

  // Hero 底部数据卡片（可编辑）
  hero_stat1_num: '2300',
  hero_stat1_unit: 'M+',
  hero_stat1_label: '作品累计播放量',
  hero_stat2_num: '22',
  hero_stat2_unit: '+',
  hero_stat2_label: '代表作品',
  hero_stat3_num: '03',
  hero_stat3_unit: '年',
  hero_stat3_label: '创作经验',
  hero_stat4_num: '不限',
  hero_stat4_unit: '',
  hero_stat4_label: '期望工作地',
  about_location: '期望工作地 不限',

  about_points: [
    '思维活跃，富有创意，紧跟互联网潮流，曾与明基显示屏合作产出广告。',
    '具备独立创作 3DCG 视频的能力，作品在抖音、小红书累计播放量超 2300 万。',
    '熟悉 Blender 全流程及 AI 工具（TapNow、即梦 AI、Vidu AI 等），高效实现创意视觉表达。',
    '对影视、游戏等内容有深度体验与见解，融合国风与前沿视觉风格进行创作。',
    '积极探索 Vibe Coding 领域，借助 Trae、墨刀 AI、Google Stitch 等工具将创意快速转化为可交互原型。'
  ],

  skills: [
    { icon: '塑', title: '三维建模渲染', desc: 'Blender 全流程，独立完成模型/绑定/动画/渲染', level: 85 },
    { icon: 'AI', title: 'AIGC 创作', desc: 'TapNow / 即梦 / Vidu / 海螺 / 可灵 / NanoBanana', level: 95 },
    { icon: '剪', title: '剪辑调色', desc: 'PR / 剪映 / DaVinci 调色 / AE / Nuke 合成', level: 80 },
    { icon: '码', title: 'Vibe Coding', desc: 'Trae / 墨刀 AI / Google Stitch · 创意转原型', level: 90 },
    { icon: 'UE', title: '虚拟制片', desc: 'UE5 地编 + Aximmetry 虚拟直播', level: 70 }
  ],

  tools: [
    'Blender', 'Unreal Engine 5', 'After Effects', 'Premiere Pro', 'Nuke', 'DaVinci Resolve',
    'Photoshop', '剪映', 'Aximmetry', 'TapNow', '即梦 AI', '海螺 AI', 'Vidu AI', '可灵 AI',
    'Liblib', 'NanoBanana', 'Trae', '墨刀 AI', 'Google Stitch', 'WebGAL', 'RPG Maker', 'GitHub Pages', 'Code Buddy'
  ],

  experience: [
    {
      company: '腾讯云雀',
      role: 'AI 视频美学评估',
      period: '2026.04 - 至今',
      points: [
        '影视内容深度解析：负责院线电影、剧集、动画、纪录片、创意短片等多类型视频素材的逐帧专业拉片，拆解其视听语言体系与叙事结构，建立标准化的内容认知框架。',
        '专业美学标注产出：严格遵循业务规范与创意美学要求，为视频镜头撰写兼具专业性、叙事性与艺术表现力的标注文案（Caption），精准还原镜头的视觉信息与情感内核，为大模型的视频理解与生成能力提供高质量训练数据。',
        '视觉元素精准拆解：运用影视专业知识，系统标注镜头核心美学要素，包括构图法则、光影造型、色彩调性、镜头运动、场面调度、人物表演与情绪传递等，构建精细化的视觉特征标签体系。',
        '叙事逻辑与氛围提炼：分析视频的剪辑节奏、转场技巧与整体叙事逻辑，提炼镜头组的叙事功能、情感氛围与主题立意，完成段落级的视听表达特征标注。',
        '标注体系迭代共建：参与标注规则培训、质量校准评审与优秀案例复盘会，结合影视行业前沿审美趋势提出规则优化建议，与团队共同提升标注体系的专业度与覆盖度。',
        '标注团队带教与质量管控：负责外包标注人员的日常带教与任务拆解，清晰传达业务规范与创意美学要求，针对性解答实操过程中的各类问题；系统性梳理标注过程中的共性难点与争议案例，沉淀解决方案并推动标注标准的迭代优化；严格执行标注成果的质量抽检与全量复核，及时纠正标注偏差，保障训练数据的专业度与一致性。'
      ],
      result: ''
    },
    {
      company: '中国广播电视社会组织联合会',
      role: 'AI 视频设计',
      period: '2026.02 - 2026.03',
      points: [
        '负责从创意策划到成片输出的全流程创作，主要面向海外社交流媒体平台，打造以中国医疗为主题的 AI 真人短剧内容。',
        '结合目标受众需求与品牌定位，独立完成剧本撰写、角色设定及分镜设计，确保内容符合海外用户审美与传播逻辑。',
        '通过 AI 技术实现高效视频生成与优化，提升内容产出效率。'
      ],
      result: ''
    },
    {
      company: '嘉兴九州文化传媒有限公司',
      role: 'AIGC 视频生成',
      period: '2026.01 - 2026.02',
      points: [
        '内容创作：独立完成短剧文本的细微修改，优化故事情节和对话，提升内容质量和观众体验。',
        '视频制作：负责短剧的配音、剪辑和视频生成工作，确保视频流畅度和视听效果达到专业标准。',
        '视觉设计：独立设计短剧海报和分镜，确保视觉元素与内容风格一致，提升作品吸引力。',
        '技术应用：运用 AIGC 技术将短篇小说转化为短剧内容，探索 AI 在影视创作中的应用可能性。'
      ],
      result: '成功推动多个 AIGC 短剧项目落地，涵盖末日、宫斗、系统、言情等多种风格，有效支持内容多样化与创新表达，提升项目整体完成度与用户吸引力。'
    }
  ],

  projects: [
    {
      title: '《化龙》 — 第十一届世界渲染大赛',
      cat: '动画设计',
      period: '2025.08',
      desc: '负责内容：以"极限狂飙"为主题，独立完成从分镜到成片的全流程制作，强化叙事节奏与视觉冲击力。融入新国风与仙侠题材，在 Blender 进行场景搭建与灯光测试，并使用即梦 AI、Vidu AI 辅助概念生成与背景贴图制作，提升创作效率与风格统一性。\n项目情况：作品在抖音播放量突破 545 万，小红书播放量 47 万，进一步巩固个人在风格化 3D 动画领域的创作辨识度。',
      meta: ['抖音 545万+', '小红书 47万+', '新国风 / 仙侠'],
      link: 'https://v.douyin.com/ZmLvz0BXvpU/',
      workId: 'w1'
    },
    {
      title: '《水墨世界》 — 第九届世界渲染大赛',
      cat: '动画设计',
      period: '2024.08',
      desc: '负责内容：围绕赛事主题"动能冲刺"，自主构思并独立完成全流程 3DCG 短片创作，涵盖概念设定、建模、动画、渲染与后期合成。创意融合水墨艺术与仙侠元素，通过 Blender 实现动态粒子与风格化渲染，并完成合成与节奏剪辑，突出"传统美学与现代动感"的视觉叙事。\n项目情况：作品在抖音播放量超 1800 万，小红书播放量达 27 万，获得广泛用户互动与行业关注，验证了内容设计对年轻受众的吸引力。',
      meta: ['抖音 1800万+', '小红书 27万+', '水墨风格'],
      link: 'https://v.douyin.com/LNGlzwjR9NA/',
      workId: 'w2'
    },
    {
      title: '《诡异事件录》 — 地理可视化主题展示站',
      cat: 'Vibe Coding 网站开发',
      period: '2026.03 - 2026.04',
      desc: '-独立完成从需求设计到上线部署的全流程，采用"AI 原型生成 + 代码智能修改"的 Vibe Coding 工作流，零前端基础仅用 2 周完成开发。\n-实现全球 3D 交互式地图，支持 100+ 灵异事件的可视化展示，并伴有事件介绍。\n-开发了高级探测、绝密档案、关于机构三大核心模块，实现事件详情弹窗、平滑滚动、地图缩放等交互功能。\n-解决了事件标记重叠、鼠标悬停颜色异常、代码冗余等多个技术问题，优化了页面加载速度和用户体验。\n-最终通过 GitHub Pages 完成部署上线，实现全球可访问。',
      meta: ['3D 地图', '100+ 事件', 'GitHub Pages'],
      link: 'https://jinwohuli.github.io/guiyishijianlu/',
      workId: 'w3'
    },
    {
      title: '《推理小说十诫》 — 校园推理题材像素 RPG 游戏',
      cat: '独立创作者',
      period: '2025.03 - 2025.05',
      desc: '-基于 RPG Maker 引擎独立完成一款校园推理游戏的全流程开发，涵盖选题策划、关卡地图设计、剧情脚本撰写、事件逻辑编排与测试优化，最终交付完整的可游玩作品。\n-根据"推理小说十诫"创作核心谜题，设计 6 名嫌疑人、多场景搜证与剧情分支，通过开关控制、条件触发与选项对话系统实现非线性推理体验，玩家需通过逻辑排除法锁定真凶。\n-完成多个场景（学校、走廊、教室、侦探社等）的地图搭建；设计线索搜集系统（宝箱、道具、血迹等），并通过思考法阵与提示机制优化玩家引导，降低卡关率。\n-经历测试—排障—迭代闭环：修复对话逻辑 BUG，动态调整侦探社入口触发条件以防止剧情错乱；为不同场景配置专属背景音乐，调优开局引导与线索辨识度以提升沉浸感。',
      meta: ['RPG Maker', '校园推理', '非线性叙事'],
      link: 'https://jinwohuli.itch.io/tuilixiaoshuoshijie',
      workId: 'w4'
    },
    {
      title: '《逐光》 — 互动叙事游戏制作',
      cat: '互动叙事设计师',
      period: '2024.03 - 2024.06',
      desc: '-基于《卡拉比丘》的二次创作互动叙事游戏。\n-使用 WebGAL 引擎搭建游戏整体框架，完成交互逻辑的设计与脚本编写，包括分支选项、场景跳转、变量判定等，确保多线剧情稳定运行。\n-负责游戏内全流程多媒体资源的管理与实现：搜集并筛选角色立绘、背景、音效及视频素材，并对素材进行处理、适配和引擎内插入调试，提升视觉与节奏表现。\n-深度参与剧情策划讨论，基于《卡拉比丘》世界观提出主线走向、角色对话及结局的设计建议，协助优化叙事节奏与玩家代入感。',
      meta: ['WebGAL', '多线剧情', '二次创作'],
      link: '',
      workId: 'w5'
    },
    {
      title: '《Blender + AI 视觉创作》 — 字节跳动3D场景与AI细化',
      cat: '3D视觉创作',
      period: '2025',
      desc: '-采用"Blender 原型搭建 + AI 智能细化"工作流，独立完成三维场景的概念设计、建模、灯光与渲染全流程。\n-在 Blender 中进行场景搭建、材质调试与灯光测试，建立高完成度的 3D 基础原型。\n-前 3 张作品借助 AI 工具对渲染输出进行风格化细化、细节增强与氛围优化，实现传统三维与 AI 技术的创意融合。\n-第 4 张为纯 Blender 场景图，完整展示独立三维空间构建能力。\n-完成多组三维场景创作，涵盖不同风格与主题探索，提升个人在 3D 视觉表达与 AI 辅助创作领域的综合能力。',
      meta: ['Blender', 'AI 细化', '3D 场景'],
      link: '',
      workId: 'w16'
    },
    {
      title: '《Tapnow 工作流》 — AI 辅助内容生产流程展示',
      cat: 'AIGC 创作',
      period: '2026',
      desc: '-梳理并展示基于 Tapnow 平台的 AIGC 内容生产全流程工作流，涵盖从创意输入、AI 生成到后期优化与成片输出的完整链路。\n-展示如何通过 Tapnow 等 AI 工具高效实现创意概念的快速可视化，提升内容生产效率与创意迭代速度。\n-验证 AI 辅助工作流在商业内容创作场景中的可行性与效率优势。',
      meta: ['Tapnow', 'AIGC', '工作流'],
      link: '',
      workId: 'w17'
    },
    {
      title: '《个人作品集网站》 — 影视视觉创作者个人展示站',
      cat: '独立创作者',
      period: '2026.05',
      desc: '-独立完成从视觉定位到上线部署的全流程，采用"AI辅助设计+代码智能修改"的Vibe Coding工作流，将影视、AIGC、三维动画等多元作品系统整合为可浏览、可编辑的线上作品集。\n-围绕"电影级国风视觉"进行整体设计，融合藏蓝夜空、朱红飘带、鎏金粒子与墨滴印章式加载动画等元素，强化个人创作者品牌辨识度与沉浸式浏览体验。\n-搭建关于我、教育经历、作品集等完整内容模块，实现作品分类筛选、视频弹窗播放、项目经历跳转作品详情与平台链接自动识别等功能，统一接入本地视频、AI短片等多媒体内容。\n-开发编辑模式、密码保护编辑入口、本地数据持久化及静态资源版本管理，提升网站可维护性；完成全端响应式适配，优化手机、平板、桌面端的导航、作品网格与视频播放等交互体验。\n-持续排查并解决加载动画重复触发、视频关闭后音频残留、浏览器缓存、localStorage数据合并及移动端兼容等多项技术问题，最终完成网站上线部署，实现个人作品全球可访问。',
      meta: ['国风视觉', '响应式', '编辑模式'],
      link: '',
      workId: 'w15'
    }
  ],

  education: [
    {
      period: '2023 - 2027',
      school: '四川传媒学院',
      major: '本科 · 影视技术',
      courses: '三维动画设计与制作、AIGC 影视制作、虚拟制片、创意思维训练、达芬奇影视调色、NUKE 视效合成、Adobe 系列（PR、AE、PS）、UE5 场景制作'
    }
  ],

  // 作品集 - 默认放入项目里的几个亮点作品
  portfolio: [
    {
      id: 'w1',
      title: '化龙 · 第十一届世界渲染大赛',
      category: '3d',
      year: '2025',
      desc: '以"极限狂飙"为主题，独立完成从分镜到成片的新国风仙侠题材 3DCG 短片。抖音播放 545 万+、小红书 47 万+。',
      link: 'https://v.douyin.com/ZmLvz0BXvpU/',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/hualong.mp4' }
      ]
    },
    {
      id: 'w2',
      title: '水墨世界 · 第九届世界渲染大赛',
      category: '3d',
      year: '2024',
      desc: '融合水墨艺术与仙侠元素的 3DCG 短片，Blender 动态粒子与风格化渲染。抖音播放 1800 万+。',
      link: 'https://v.douyin.com/LNGlzwjR9NA/',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/shuimo.mp4' }
      ]
    },
    {
      id: 'w3',
      title: '诡异事件录 · 地理可视化',
      category: 'web',
      year: '2026',
      desc: '采用 AI 原型 + 代码智能修改的 Vibe Coding 工作流，独立完成 3D 交互式全球地图，展示 100+ 灵异事件。',
      link: 'https://jinwohuli.github.io/guiyishijianlu/',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/guiyi-demo.mp4' }
      ]
    },
    {
      id: 'w4',
      title: '推理小说十诫 · 像素 RPG',
      category: 'game',
      year: '2025',
      desc: '基于 RPG Maker 的校园推理游戏，6 名嫌疑人与多场景搜证，非线性推理体验。',
      link: 'https://jinwohuli.itch.io/tuilixiaoshuoshijie',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/tuili-demo.mp4' }
      ]
    },
    {
      id: 'w5',
      title: '逐光 · 互动叙事游戏',
      category: 'game',
      year: '2024',
      desc: '基于《卡拉比丘》的二次创作互动叙事游戏。使用 WebGAL 引擎搭建整体框架，完成交互逻辑设计与脚本编写，包括分支选项、场景跳转、变量判定等，确保多线剧情稳定运行。负责全流程多媒体资源管理与实现：搜集筛选角色立绘、背景、音效及视频素材，并在引擎内插入调试，提升视觉与节奏表现。深度参与剧情策划讨论，提出主线走向、角色对话及结局的设计建议，协助优化叙事节奏与玩家代入感。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/zhuguang.mp4' }
      ]
    },
    {
      id: 'w6',
      title: 'AIGC 医疗短剧片段',
      category: 'video',
      year: '2026',
      desc: '面向海外社交媒体平台的 AI 真人短剧（中国医疗主题），结合海外受众需求与品牌定位，独立完成剧本撰写、角色设定及分镜设计、视频生成、剪辑成片、音频制作。运用 AIGC 技术将短篇小说转化为短剧内容，探索 AI 在影视创作中的应用可能性。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/medical-drama.mp4' }
      ]
    },
    {
      id: 'w7',
      title: 'AI 多风格视觉练习',
      category: 'video',
      year: '2026',
      desc: 'AI 多风格视觉表达练习作品集。借助 TapNow、即梦 AI、Vidu AI、可灵 AI、海螺 AI 等工具，探索写实、动漫、水墨、赛博等不同视觉风格之间的转化与表达，持续打磨在镜头语言、叙事节奏与画面氛围上的把控。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/aigc-collection.mp4' }
      ]
    },
    {
      id: 'w8',
      title: 'AI 新海诚风格短片',
      category: 'video',
      year: '2026',
      desc: '以新海诚标志性的视觉语言为灵感，运用 AI 工具复现其特有的光影氛围与色彩调性 —— 高饱和的天空、温柔的逆光、青春叙事的微妙情绪。从画面构图、镜头节奏到光影色彩进行整体把控，呈现细腻、治愈、富有诗意的动画质感，是对个人 AI 视觉表达与风格化叙事能力的一次集中实践。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/shinkai-style.mp4' }
      ]
    },
    {
      id: 'w9',
      title: 'AI 医疗宣传片',
      category: 'video',
      year: '2026',
      desc: '面向海外社交流媒体平台打造的 AI 医疗主题宣传片。围绕中国医疗的专业实力与人文关怀，独立完成创意策划、剧本撰写、角色设定、分镜设计与成片输出全流程。结合海外受众审美与传播逻辑，运用 AIGC 技术高效生成镜头与角色，融合写实化光影、温暖色调与节奏化剪辑，传递专业、可信、有温度的医疗品牌形象。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/medical-ad.mp4' }
      ]
    },
    {
      id: 'w10',
      title: 'AI 企业马年宣传片',
      category: 'video',
      year: '2026',
      desc: '为企业定制的马年新春主题宣传片。以"马"的奔腾意象呼应企业蓬勃向上的发展势能，融合国风视觉与节庆氛围，独立完成创意构思、分镜设计与全流程 AI 创作。运用 AIGC 工具高效生成关键镜头与角色，结合节奏化剪辑、动感配乐与朱红金的传统色调，呈现喜庆、磅礴、富有仪式感的品牌叙事，传递企业一往无前的精神气质与新年祝福。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/horse-year-ad.mp4' }
      ]
    },
    {
      id: 'w11',
      title: 'AE 视效练习作品',
      category: 'video',
      year: '2025',
      desc: 'After Effects 动效与合成练习作品。聚焦动态图形（Motion Graphics）、关键帧节奏、图层蒙版与表达式应用，探索镜头转场、文字动效与视觉特效的细节表达。通过持续练习打磨在动画曲线、节奏把控与画面构成上的基本功，为后续的视频后期、特效合成与品牌动效项目积累扎实的工具与审美经验。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/ae-practice.mp4' }
      ]
    },
    {
      id: 'w12',
      title: 'UE5 地编练习作品',
      category: '3d',
      year: '2025',
      desc: '基于 Unreal Engine 5 的虚幻地编（关卡设计）练习作品。运用 Lumen 全局光照、Nanite 虚拟微多边形几何体、Megascans 高质量资产库，进行场景搭建、地形塑形、植被分布、光照氛围与镜头机位调度的系统训练。聚焦于真实感场景构建、电影级光影渲染与关卡叙事氛围营造，积累从空旷地形到完整场景的全流程工作经验，为虚拟制片与实时渲染项目打下扎实基础。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/ue5-practice.mp4' }
      ]
    },
    {
      id: 'w13',
      title: 'Blender 三维练习作品',
      category: '3d',
      year: '2025',
      desc: 'Blender 全流程三维练习作品。涵盖建模、UV 展开、材质贴图、灯光布光、动画绑定与 Cycles/Eevee 渲染等关键环节，探索硬表面建模、有机造型、风格化材质与电影级光影的综合表达。通过持续练习打磨从概念到成片的独立完成能力，沉淀对画面节奏、镜头语言与视觉氛围的整体把控，为后续的 3DCG 短片与项目创作积累扎实的工具与审美经验。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/blender-practice.mp4' }
      ]
    },
    {
      id: 'w14',
      title: '《猫与花》 · AI 日系青春风格片段',
      category: 'video',
      year: '2026',
      desc: '以日系青春动画为视觉灵感的 AI 短片片段。围绕「猫与花」这一温柔意象，借助 AI 工具复刻日系作品标志性的视觉语言 —— 通透干净的天空、细腻的逆光、阳光穿过枝叶的斑驳光影，以及少年感的青春情绪。从画面构图、色彩调性到镜头节奏整体把控，营造治愈、清新、富有夏日气息的诗意氛围，是一次对个人 AI 视觉表达与情绪化叙事能力的集中实践。',
      link: '',
      media: [
        { type: 'video', src: 'https://geren-videos-1424535894.cos.accelerate.myqcloud.com/videos/cat-and-flower.mp4' }
      ]
    },
    {
      id: 'w15',
      title: '《个人作品集网站》 · 影视视觉创作者展示站',
      category: 'web',
      year: '2026',
      desc: '独立完成从视觉定位到上线部署的全流程，采用"AI辅助设计+代码智能修改"的 Vibe Coding 工作流。围绕"电影级国风视觉"进行整体设计，融合藏蓝夜空、朱红飘带、鎏金粒子与墨滴印章式加载动画等元素，搭建关于我、教育经历、作品集等完整内容模块，实现作品分类筛选、视频弹窗播放、编辑模式、密码保护编辑入口及全端响应式适配。',
      link: '',
      media: [
        { type: 'image', src: './assets/portfolio-website.png' }
      ]
    },
    {
      id: 'w16',
      title: 'Blender + AI 视觉创作',
      category: '3d',
      year: '2025',
      desc: '采用"Blender 原型搭建 + AI 智能细化"工作流，独立完成多组三维场景的概念设计、建模、灯光与渲染。前 3 张为 Blender 原型 + AI 细化作品，第 4 张为纯 Blender 场景图，完整展示独立三维空间构建能力。',
      link: '',
      media: [
        { type: 'image', src: './assets/blender-ai-1.png' },
        { type: 'image', src: './assets/blender-ai-2.jpg' },
        { type: 'image', src: './assets/blender-ai-3.jpg' },
        { type: 'image', src: './assets/blender-scene.png' }
      ]
    },
    {
      id: 'w17',
      title: 'Tapnow 工作流',
      category: 'image',
      year: '2026',
      desc: '基于 Tapnow 平台的 AIGC 内容生产全流程展示，涵盖从创意输入、AI 生成到后期优化与成片输出的完整链路，验证 AI 辅助工作流在商业内容创作场景中的可行性与效率优势。',
      link: '',
      media: [
        { type: 'image', src: './assets/tapnow-workflow.png' }
      ]
    }
  ]
};
